export function useDoggo() {
  async function bark() {
    const audio = new Audio('/bark.ogg')
    audio.play()
    return 'Ahora dame una galleta.'
  }

  return {
    bark,
  }
}