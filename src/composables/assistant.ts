import OpenAI from 'openai'
import { threadStore } from '../stores/thread'
import { openaiStore } from '../stores/openai'
import { assistantStore } from '../stores/assistant'
import { useDoggo } from './doggo'
import { ref } from 'vue'
import { AsanaApi } from '../tools/asana'

const assistantId = await assistantStore.id()
const threadId = await threadStore.id()

export const message = ref('')

export function useAssistant() {

  const doggo = useDoggo()

  async function sendMessage(message: string) {
    await openaiStore.threads.messages.create(threadId, {
      role: 'user',
      content: [{
        type: 'text',
        text: message,
      }],
    })

    const run = await openaiStore.threads.runs.createAndPoll(
      threadId,
      { assistant_id: assistantId },
      { pollIntervalMs: 1 },
    )

    await handleRunStatus(run)

    return 'ya'
  }

  async function handleRunStatus(run: OpenAI.Beta.Threads.Runs.Run) {
    if (run.status === 'completed') {
      const lastMessage = await openaiStore.threads.messages.list(threadId, { order: 'desc', limit: 1 })
      message.value = (lastMessage.data[0].content[0] as any).text.value
    } else if (run.status === 'requires_action') {
      await handleRequiresAction(run)
    } else {
      console.error('Run did not complete:', run)
    }
  }

  async function handleRequiresAction(run: OpenAI.Beta.Threads.Runs.Run) {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolOutputs = await Promise.all(run.required_action.submit_tool_outputs.tool_calls.map(
        async (tool) => {
          try {
            const parameters = JSON.parse(tool.function.arguments)
            const toolFunction = AsanaApi[tool.function.name as keyof typeof AsanaApi]
            const res = await toolFunction(parameters)
  
            return {
              tool_call_id: tool.id,
              output: res,
            }
          } catch (error) {
            throw new Error(`Unknown tool call function: ${tool.function.name}`)
          }
        },
      ))

      if (toolOutputs.length > 0) {
        run = await openaiStore.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs },
          { pollIntervalMs: 1 },
        )
        console.log('Tool outputs submitted successfully.')
      } else {
        console.log('No tool outputs to submit.')
      }
  
      return handleRunStatus(run)
    }
  }

  return {
    sendMessage,
  }
}
