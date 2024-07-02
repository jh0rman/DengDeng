<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { message, useAssistant } from './composables/assistant'
import { useSpeechRecognition } from './composables/speech-recognition'
import { useSpeechSynthesis } from './composables/speech-synthesis'
import Logo from './components/Logo.vue'
import { useDoggo } from './composables/doggo'

const { sendMessage } = useAssistant()
const { speak } = useSpeechSynthesis()
const { startRecognition, recognizing, provisionalTranscript, finalTranscript } = useSpeechRecognition()
const { bark } = useDoggo()

onMounted(() => {
  setTimeout(() => {
    message.value = 'Hola. ¿En qué puedo ayudarte?'
  }, 1000)
})

watch(message, message => {
  if (!message) return
  speak(message)
})

watch(recognizing, async value => {
  if (!value) {
    await sendMessage(finalTranscript.value)
  } else {
    finalTranscript.value = ''
  }
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center px-7 pb-7">
    <Logo class="w-36 z-10 ml-2 -mb-4 cursor-pointer" @click="bark" />
    <div class="w-full">
      <div class="bg-white/5 px-4 pt-3 pb-4 rounded-2xl space-y-1">
        <template v-if="recognizing">
          <strong>Usuario:</strong>
          <p class="leading-5">{{ provisionalTranscript || '...' }}</p>
        </template>
        <template v-else>
          <strong>Asistente:</strong>
          <p class="leading-5">{{ message || '...' }}</p>
        </template>
      </div>
      <div class="mt-3">
        <button
          class="rounded-2xl px-4 text-white h-11 bg-black/20 hover:bg-black/30 active:bg-black/40 disabled:pointer-events-none font-bold"
          @click="startRecognition"
        >
          {{ recognizing ? 'Escuchando...' : 'Hablar' }}
        </button>
      </div>
    </div>
  </div>
</template>
