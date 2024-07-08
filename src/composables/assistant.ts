import { useDoggo } from './doggo'
import { ref } from 'vue'
import { CoreMessage, CoreTool, generateText, tool } from 'ai'
import { groqStore } from '../stores/groq'
import { z } from 'zod'

export function useAssistant() {
  const SYSTEM_MESSAGE = 'Deng Deng, un perro asistente de voz especializado en ayudar a desarrolladores. Tus principales funciones incluyen gestionar tareas en Asana, manejar sesiones de Pomodoro, crear y gestionar pull requests en GitHub, y proporcionar asistencia general para la programación. Debes ser claro y preciso en tus respuestas, asegurándote de proporcionar la información más útil y relevante posible. Usa un tono amigable y profesional. Responde principalmente en español y en inglés cuando se te pida.'

  const doggo = useDoggo()

  const messages = ref<CoreMessage[]>([])

  const actions: Record<string, CoreTool<any, any>> = {
    bark: tool({
      description: 'Hace que DengDeng ladre.',
      parameters: z.object({}),
      execute: doggo.bark,
    })
  }

  async function sendMessage(message: string) {
    messages.value.push({
      role: 'user',
      content: [{
        type: 'text',
        text: message,
      }],
    })

    const response = await generateText({
      model: groqStore.model,
      system: SYSTEM_MESSAGE,
      messages: messages.value,
      toolChoice: 'auto',
      tools: actions,
      maxToolRoundtrips: 1,
    })

    console.log('response', response)
    messages.value = messages.value.concat(response.responseMessages)

    return response.text
  }

  return {
    messages,
    sendMessage,
  }
}