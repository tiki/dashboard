<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'

import { ref } from 'vue'

import { OrganizationService, type Organization } from './services'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const orgName = ref<string>('')
const hostName = ref<string>('')
const error = ref<string>()

const createOrgDomain = async () => {
  if (!orgName.value || !hostName.value)
    return (error.value = 'Organization and Domain Names are required')

  const orgResponse: Organization = await OrganizationService.create(orgName.value)
}
</script>

<template>
  <Dialog v-bind:visible="isVisible" modal header="New Organization" :style="{ width: '30rem' }">
    <div>
      <form class="flex flex-col justify-center items-center gap-6">
        <InputText class="w-full" placeholder="Organization Name" :v-model="orgName" />
        <InputText class="w-full" placeholder="Host Name" :v-model="hostName" />
        <Message severity="error" class="w-full flex justify-center items-center" v-if="error">{{
          error
        }}</Message>
        <Button
          label="Submit"
          severity="success"
          class="w-full"
          style="background-color: #00b272"
          @click="createOrgDomain"
        />
      </form>
    </div>
  </Dialog>
</template>
