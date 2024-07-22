<script setup lang="ts">
import { openaiStore } from './stores/openai'

async function testTextToSpeech() {
  const mp3 = await openaiStore.audio.speech.create({
    model: 'tts-1',
    voice: 'echo',
    input: 'Deng Deng perro malo',
  })

  const audio = new Audio()
  audio.src = URL.createObjectURL(await mp3.blob())
  audio.play()
}
</script>

<template>
  <button @click="testTextToSpeech">
    click
  </button>
</template>
