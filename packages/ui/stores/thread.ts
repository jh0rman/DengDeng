import { reactive } from 'vue'
import { openaiStore } from './openai'
import { useStorage } from '../composables/local-storage'

export const threadStore = reactive({
  async id() {
    const thread = await this.getThread()
    return thread.id
  },
  async getThread() {
    const { getThreadId, setThreadId } = useStorage()
    const threadId = getThreadId()
    if (threadId) {
      try {
        return await openaiStore.threads.retrieve(threadId)
      } catch (error) {
        return await this.createThread()
      }
    } else {
      const thread = await this.createThread()
      setThreadId(thread.id)
      return thread
    }
  },
  async createThread() {
    return await openaiStore.threads.create()
  },
})
