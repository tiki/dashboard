<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
</script>

<template>
  <div class="flex gap-2 items-center justify-center text-white">
    <ProgressSpinner style="width: 30px; height: 30px" strokeWidth="8" />
    Loading data. Please wait.
  </div>
</template>
