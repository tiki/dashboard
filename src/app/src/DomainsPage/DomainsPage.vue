<script setup lang="ts">
import Button from 'primevue/button'
import DomainsTable from './DomainsTable.vue'
import NewDomainDialog from './NewDomainDialog.vue'
import { ref } from 'vue'

const isVisible = ref<boolean>(false)
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold px-3">Domains</h1>
      <Button
        label="New Domain"
        style="background-color: #00b272"
        @click="isVisible = !isVisible"
      />
    </div>
    <Domains-Table />
  </div>
  <New-Domain-Dialog :is-visible="isVisible" @update:visible="isVisible = !isVisible" />
</template>

<style></style>
