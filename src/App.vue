<script setup lang="ts">
import { watch } from 'vue'
import { message, useAssistant } from './composables/assistant'
import { useSpeechRecognition } from './composables/speech-recognition'
import { useSpeechSynthesis } from './composables/speech-synthesis'

const { sendMessage } = useAssistant()
const speechSynthesis = useSpeechSynthesis()
const speechRecognition = useSpeechRecognition()

watch(message, message => {
  console.log('response', message)
  speechSynthesis.speak(message)
})

watch(speechRecognition.recognizing, async (value) => {
  if (!value) {
    await sendMessage(speechRecognition.finalTranscript.value)
  } else {
    speechRecognition.finalTranscript.value = ''
  }
})

function handleMessage() {
  speechRecognition.start()
}
</script>

<template>
  <h1 className="text-3xl font-bold underline">
    https://developers.asana.com/reference/gettask
  </h1>
  <button @click="handleMessage" class="bg-purple-300 rounded-md px-2 py-1 cursor-pointer">
    enviar mensaje {{ speechRecognition.recognizing }}
  </button>
  <p>{{ speechRecognition.finalTranscript }}</p>
</template>
