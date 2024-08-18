import { reactive } from 'vue'
import { useStorage } from '../composables/local-storage'
import { createOpenAI } from '@ai-sdk/openai'

export const groqStore = reactive({
  get instance() {
    const { getGroqApiKey } = useStorage()
    const groq = createOpenAI({
      apiKey: getGroqApiKey(),
      baseURL: 'https://api.groq.com/openai/v1',
    })
    return groq
  },
  get model() {
    return this.instance('llama3-groq-70b-8192-tool-use-preview')
  }
})
