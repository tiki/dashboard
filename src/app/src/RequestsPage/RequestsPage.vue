<script setup lang="ts">
import Button from 'primevue/button'
import RequestsTable from './RequestsTable.vue'
import { ref } from 'vue'
import NewRequestDialog from './NewRequestDialog.vue'

const isVisible = ref<boolean>(false)
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold px-3">My Requests</h1>
      <Button
        label="New Request"
        style="background-color: #00b272"
        @click="isVisible = !isVisible"
      />
    </div>
    <Requests-Table />
  </div>
  <New-Request-Dialog :is-visible="isVisible" @update:visible="isVisible = !isVisible" />
</template>

<style></style>
