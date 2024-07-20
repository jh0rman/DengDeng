import { reactive } from 'vue'
import { openaiStore } from './openai'
import { useStorage } from '../composables/local-storage'

export const assistantStore = reactive({
  async id() {
    const assistant = await this.getAssistant()
    return assistant.id
  },
  async getAssistant() {
    const { getAssistantId, setAssistantId } = useStorage()
    const assistantId = getAssistantId()
    if (assistantId) {
      try {
        return await openaiStore.assistants.retrieve(assistantId)
      } catch (error) {
        return await this.createAssistant()
      }
    } else {
      const instance = await this.createAssistant()
      setAssistantId(instance.id)
      return instance
    }
  },
  async createAssistant() {
    return await openaiStore.assistants.create({
      model: 'gpt-4o-mini',
      name: 'Deng Deng',
      instructions: 'Eres Deng Deng, un asistente de voz especializado en ayudar a desarrolladores. Tus principales funciones incluyen gestionar tareas en Asana, manejar sesiones de Pomodoro, crear y gestionar pull requests en GitHub, y proporcionar asistencia general para la programación. Debes ser claro y preciso en tus respuestas, asegurándote de proporcionar la información más útil y relevante posible. Usa un tono amigable y profesional. Responde principalmente en español y en inglés cuando se te pida.',
      tools: [{
        type: 'function',
        function: {
          name: 'get_creator_name_by_last_name',
          description: 'Obtener el nombre del creador de la aplicación por su apellido.',
          parameters: {
            type: 'object',
            properties: {
              last_name: {
                type: 'string',
                description: 'El apellido del creador de la aplicación.',
              },
            },
            required: ['last_name'],
          },
        },
      }]
    })
  },
})
