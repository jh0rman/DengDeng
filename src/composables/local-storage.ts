export function useStorage() {
  const openaiKeyName = 'OPENAI_API_KEY'
  const assistantKeyName = 'ASSISTANT_ID'
  const threadKeyName = 'THREAD_ID'

  function getOpenAIKey() {
    return localStorage.getItem(openaiKeyName) ?? undefined
  }

  function setOpenAIKey(value: string) {
    localStorage.setItem(openaiKeyName, value)
  }

  function getAssistantId() {
    return localStorage.getItem(assistantKeyName) ?? undefined
  }

  function setAssistantId(value: string) {
    localStorage.setItem(assistantKeyName, value)
  }

  function getThreadId() {
    return localStorage.getItem(threadKeyName) ?? undefined
  }

  function setThreadId(value: string) {
    localStorage.setItem(threadKeyName, value)
  }

  return {
    getOpenAIKey,
    setOpenAIKey,
    getAssistantId,
    setAssistantId,
    getThreadId,
    setThreadId,
  }
}