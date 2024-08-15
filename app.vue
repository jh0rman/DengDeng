<script setup lang="ts">
const { data } = await useFetch('/api/list-profiles')
</script>

<template>
  <div class="w-96 bg-zinc-800 text-white">
    {{ data }}
    <NuxtRouteAnnouncer />
  </div>
</template>
