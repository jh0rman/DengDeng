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
    return client.beta
  },
  get threads() {
    return this.instance.threads
  },
  get assistants() {
    return this.instance.assistants
  },
})
