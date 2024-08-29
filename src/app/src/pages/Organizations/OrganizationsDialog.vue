<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

import { ref } from 'vue'

import { OrganizationService, type Organization, DomainService, type Domain } from './services'
import { useLoading } from '@/services'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['copied'])

const orgName = ref<string>()
const hostName = ref<string>()
const error = ref<string>()

const domain = ref<Domain>()

const { isLoading: isSubmitting, withLoading } = useLoading()

const createOrgDomain = async () => {
  if (!orgName.value || !hostName.value)
    return (error.value = 'Organization and Domain Names are required')

  const orgResponse: Organization = await OrganizationService.create(orgName.value)

  if (!orgResponse || !orgResponse.orgId)
    return (error.value = 'Error while creating a Organization, try again later.')

  const domainResponse: Domain = await DomainService.create(hostName.value, orgResponse.orgId)

  if (!domainResponse) return (error.value = 'Error while setting up a domain, try again later.')

  domain.value = domainResponse
}

const onSubmit = () => {
  withLoading(createOrgDomain)
}

const copyToClipboard = (secret: string) => {
  navigator.clipboard.writeText(secret)
  emit('copied')
}
</script>

<template>
  <Dialog
    v-bind:visible="isVisible"
    modal
    :header="!domain ? 'New Organization' : 'Organization Created'"
    :style="{ width: '30rem' }"
  >
    <div v-if="!domain?.secret">
      <form class="flex flex-col justify-center items-center gap-6">
        <InputText class="w-full" placeholder="Organization Name" v-model="orgName" />
        <InputText class="w-full" placeholder="Host Name" v-model="hostName" />
        <Message severity="error" class="w-full flex justify-center items-center" v-if="error">{{
          error
        }}</Message>
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
    <div v-else>
      <Message severity="success" class="w-full flex justify-center items-center">
        {{ domain.secret }}
        <Button
          icon="pi pi-clone"
          severity="contrast"
          text
          rounded
          aria-label="copy"
          @click="copyToClipboard(domain.secret)"
        />
      </Message>
    </div>
  </Dialog>
</template>

<style>
.p-progressspinner-spin {
  --p-progressspinner-color-1: white;
  --p-progressspinner-color-2: white;
  --p-progressspinner-color-3: white;
  --p-progressspinner-color-4: white;
}
</style>
