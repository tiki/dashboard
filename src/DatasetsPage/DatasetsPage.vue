<script setup lang="ts">
import Button from 'primevue/button'
import DatasetsTable from './DatasetsTable.vue'
</script>

<template>
  <div class="ml-[20rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold">Datasets</h1>
    </div>
    <datasets-table />
  </div>
</template>

<style></style>
