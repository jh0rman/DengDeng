<script setup lang="ts">
import { watch } from 'vue'
import { useAssistant } from './composables/assistant'
import { useSpeechRecognition } from './composables/speech-recognition'
import { useSpeechSynthesis } from './composables/speech-synthesis'

const { messages, sendMessage } = useAssistant()
const speechSynthesis = useSpeechSynthesis()
const speechRecognition = useSpeechRecognition()

watch(speechRecognition.recognizing, async (value) => {
  if (!value) {
    const response = await sendMessage(speechRecognition.finalTranscript.value)
    console.log('response', response)
    if (!response) return
    speechSynthesis.speak(response)
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
  <p v-for="message in messages">
    <b>{{ message.role }}:</b>
    {{ message.content }}
  </p>
</template>
