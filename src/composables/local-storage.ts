export function useStorage() {
  const groqKeyName = 'GROQ_API_KEY'

  function getGroqApiKey() {
    return localStorage.getItem(groqKeyName) ?? undefined
  }

  function setGroqApiKey(value: string) {
    localStorage.setItem(groqKeyName, value)
  }

  return {
    getGroqApiKey,
    setGroqApiKey,
  }
}