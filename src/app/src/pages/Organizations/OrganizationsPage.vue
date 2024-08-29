<script setup lang="ts">
import Button from 'primevue/button'
import OrganizationTable from './OrganizationsTable.vue'
import NewOrganizationDialog from './OrganizationsDialog.vue'
import Toast from 'primevue/toast'

import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const isVisible = ref<boolean>(false)

const secretCopied = (refreshed: boolean) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: !refreshed ? 'Copied to clipboard' : 'Token refreshed and copied to clipboard',
    life: 5000,
    group: 'bc'
  })
}
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold px-3">Organizations</h1>
      <Button
        label="New Organization"
        style="background-color: #00b272"
        @click="isVisible = !isVisible"
      />
    </div>
    <Organization-Table @copied="secretCopied" @refreshed="secretCopied(true)" />
  </div>
  <New-Organization-Dialog
    :is-visible="isVisible"
    @update:visible="isVisible = !isVisible"
    @copied="secretCopied(false)"
  />
  <Toast position="bottom-center" group="bc" />
</template>

<style></style>
