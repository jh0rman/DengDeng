import OpenAI from 'openai'
import { threadStore } from '../stores/thread'
import { openaiStore } from '../stores/openai'
import { assistantStore } from '../stores/assistant'

export async function useAssistant() {
  const assistantId = await assistantStore.id()
  const threadId = await threadStore.id()

  await openaiStore.threads.messages.create(threadId, {
    role: 'user',
    content: '¿quién creó esta aplicación? su apellido es Ipsum',
  })

  const run = await openaiStore.threads.runs.createAndPoll(threadId, { assistant_id: assistantId })

  handleRunStatus(run)

  async function handleRunStatus(run: OpenAI.Beta.Threads.Runs.Run) {
    if (run.status === 'completed') {
      const lastMessage = await openaiStore.threads.messages.list(threadId, { order: 'desc', limit: 1 })
      console.log(lastMessage.data[0].content)
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
      const toolOutputs: OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[] = run.required_action.submit_tool_outputs.tool_calls.map(
        tool => {
          const parameters = JSON.parse(tool.function.arguments)
          console.log(parameters)

          switch (tool.function.name) {
            case 'get_creator_name_by_last_name':
              return {
                tool_call_id: tool.id,
                output: 'Lorem',
              }
            default:
              throw new Error(
                `Unknown tool call function: ${tool.function.name}`,
              )
          }
        },
      )

      if (toolOutputs.length > 0) {
        run = await openaiStore.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs },
        )
        console.log('Tool outputs submitted successfully.')
      } else {
        console.log('No tool outputs to submit.')
      }
  
      return handleRunStatus(run)
    }
  }
}