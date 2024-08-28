<script setup lang="ts">
import Button from 'primevue/button'
import OrganizationTable from './OrganizationsTable.vue'
import NewOrganizationDialog from './OrganizationsDialog.vue'
import Toast from 'primevue/toast'

import { ref } from 'vue'
import { auth } from '@/services'
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

onMounted(async () => {
  const token = await auth.token()
  console.log(token)
})

const isVisible = ref<boolean>(false)

const newOrgCreated = () => {
  isVisible.value = false
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'New Organization Created',
    life: 3000,
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
    <Organization-Table />
  </div>
  <New-Organization-Dialog
    :is-visible="isVisible"
    @update:visible="isVisible = !isVisible"
    @created="newOrgCreated"
  />
  <Toast position="bottom-center" group="bc" />
</template>

<style></style>
