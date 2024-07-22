import OpenAI from 'openai'
import { reactive } from 'vue'
import { useStorage } from '../composables/local-storage'

export const openaiStore = reactive({
  get instance() {
    const { getOpenAIKey } = useStorage()
    const client = new OpenAI({
      apiKey: getOpenAIKey(),
      dangerouslyAllowBrowser: true,
    })
    return client
  },
  get audio() {
    return this.instance.audio
  },
  get assistants() {
    return this.instance.beta.assistants
  },
  get threads() {
    return this.instance.beta.threads
  },
})
