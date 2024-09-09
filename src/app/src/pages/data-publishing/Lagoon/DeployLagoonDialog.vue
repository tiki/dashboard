<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

import { onMounted, ref } from 'vue'

import { useLoading } from '@/services'
import { type Organization, OrganizationService } from '@/pages/account/Organizations/services'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const { isLoading: isSubmitting, withLoading } = useLoading()

const selectedOrganization = ref<string>()
const organizations = ref<Organization[]>([])

const requestTable = async () => {
  organizations.value = await OrganizationService.get()
}

onMounted(async () => {
  selectedOrganization.value = ''
  await requestTable()
})

const onSubmit = () => {
  console.log('test', selectedOrganization.value)
}
</script>

<template>
  <Dialog v-bind:visible="isVisible" modal :header="'Deploy Lagoon'" :style="{ width: '30rem' }">
    <div>
      <form class="flex flex-col justify-center items-center gap-6">
        <Select
          v-model="selectedOrganization"
          :options="organizations"
          optionLabel="name"
          placeholder="Select the organization"
          class="w-full"
        />
        <Button
          label="Submit"
          severity="success"
          class="w-full"
          style="background-color: #00b272"
          :disabled="isSubmitting"
          @click="onSubmit"
        >
          <ProgressSpinner v-if="isSubmitting" style="width: 30px; height: 30px" strokeWidth="8" />
        </Button>
      </form>
    </div>
  </Dialog>
</template>
