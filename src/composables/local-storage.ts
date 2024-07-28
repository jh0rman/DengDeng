export function useStorage() {
  const groqKeyName = 'GROQ_API_KEY'
  const openaiKeyName = 'OPENAI_API_KEY'
  const assistantKeyName = 'ASSISTANT_ID'
  const threadKeyName = 'THREAD_ID'

  function getGroqApiKey() {
    return localStorage.getItem(groqKeyName) ?? undefined
  }

  function setGroqApiKey(value: string) {
    localStorage.setItem(groqKeyName, value)
  }

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
    getGroqApiKey,
    setGroqApiKey,
    getOpenAIKey,
    setOpenAIKey,
    getAssistantId,
    setAssistantId,
    getThreadId,
    setThreadId,
  }
}