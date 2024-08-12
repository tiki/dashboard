<script setup lang="ts">
import Button from 'primevue/button'
import DomainsTable from './DomainsTable.vue'
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold px-3">Domains</h1>
      <Button label="New Domain" style="background-color: #00b272" />
    </div>
    <Domains-Table />
  </div>
</template>

<style></style>
