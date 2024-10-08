<script setup lang="ts">
import { ref } from 'vue'
import LagoonTable from './LagoonTable.vue'
import Button from 'primevue/button'
import DeployLagoonDialog from './DeployLagoonDialog.vue'

const isVisible = ref<boolean>(false)
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center px-3">
      <h1 class="text-3xl uppercase text-dark-blue font-bold">Lagoon</h1>
      <Button label="Deploy" style="background-color: #00b272" @click="isVisible = !isVisible" />
    </div>
    <LagoonTable />
    <DeployLagoonDialog :isVisible="isVisible" @update:visible="isVisible = !isVisible" />
  </div>
</template>

<style></style>
