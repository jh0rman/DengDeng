import OpenAI from 'openai'
import { useStorage } from './local-storage'
import { ref } from 'vue'

const assistant = ref<OpenAI.Beta.Assistants.Assistant>()

export async function useAssistant() {
  const { getOpenAIKey, getAssistantId, setAssistantId, getThreadId, setThreadId } = useStorage()

  const openai = new OpenAI({
    apiKey: getOpenAIKey(),
    dangerouslyAllowBrowser: true,
  })

  assistant.value = await getAssistant()

  const threadId = getThreadId() ?? await createAndStoreThreadId()

  async function getAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    const assistantId = getAssistantId()
    if (assistantId) {
      return await openai.beta.assistants.retrieve(assistantId)
    } else {
      const instance = await openai.beta.assistants.create({
        model: 'gpt-4o-mini',
        name: 'Deng Deng',
        instructions: 'Eres Deng Deng, un asistente de voz especializado en ayudar a desarrolladores. Tus principales funciones incluyen gestionar tareas en Asana, manejar sesiones de Pomodoro, crear y gestionar pull requests en GitHub, y proporcionar asistencia general para la programación. Debes ser claro y preciso en tus respuestas, asegurándote de proporcionar la información más útil y relevante posible. Usa un tono amigable y profesional. Responde principalmente en español y en inglés cuando se te pida.',
        tools: [{
          type: 'function',
          function: {
            name: 'asana',
            description: 'Gestiona tareas en Asana',
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city and state e.g. San Francisco, CA',
                },
                unit: {
                  type: 'string',
                  enum: [
                    'c',
                    'f'
                  ]
                }
              },
              required: ['location'],
            },
          },
        }]
      })
      setAssistantId(instance.id)
      return instance
    }
  }

  async function createAndStoreThreadId() {
    const threadId = (await openai.beta.threads.create()).id
    setThreadId(threadId)
    return threadId
  }
}