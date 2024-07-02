import { ref } from 'vue'

export function useSpeechRecognition() {
  const webkitSpeechRecognition = window.webkitSpeechRecognition
  const recognition = new webkitSpeechRecognition()

  const recognizing = ref(false)
  const provisionalTranscript = ref('')
  const finalTranscript = ref('')

  recognition.lang = 'es'
  recognition.continuous = true
  recognition.interimResults = true

  recognition.onstart = function() {
    recognizing.value = true
  }

  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      provisionalTranscript.value = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript.value += event.results[i][0].transcript
      }
    }
  }

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      console.error('No speech')
    }
    if (event.error == 'audio-capture') {
      console.error('No microphone')
    }
    if (event.error == 'not-allowed') {
      console.error('Permission denied')
    }
  }

  recognition.onend = function() {
    recognizing.value = false    
  }

  function startRecognition() {
    recognizing.value
      ? recognition.stop()
      : recognition.start()
  }

  return {
    recognizing,
    provisionalTranscript,
    finalTranscript,
    startRecognition,
  }
}
