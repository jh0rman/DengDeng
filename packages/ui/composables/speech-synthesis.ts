export function useSpeechSynthesis() {
  const speechSynthesis = window.speechSynthesis
  speechSynthesis.getVoices()

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = speechSynthesis.getVoices().filter(voice => voice.name === 'Microsoft Alex Online (Natural) - Spanish (Peru)')[0]
    if (!voice) {
      console.error('Voice not found')
      return
    }
    utterance.voice = voice
    utterance.rate = 1.2
    speechSynthesis.speak(utterance)
  }

  return {
    speak,
  }
}