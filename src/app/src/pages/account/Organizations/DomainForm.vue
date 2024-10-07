<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

import { ref } from 'vue'

import { DomainService, type Domain } from './services'
import { useLoading } from '@/services'

const props = defineProps({
  orgId: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['copied'])

const hostName = ref<string>()
const error = ref<string>()

const domain = ref<Domain>()

const { isLoading: isSubmitting, withLoading } = useLoading()

const createDomain = async () => {
  if (!hostName.value) return (error.value = 'Organization and Domain Names are required')

  const domainResponse: Domain = await DomainService.create(hostName.value, props.orgId!)

  if (!domainResponse) return (error.value = 'Error while setting up a domain, try again later.')

  domain.value = domainResponse
}

const onSubmit = () => {
  withLoading(createDomain)
}

const copyToClipboard = (secret: string) => {
  navigator.clipboard.writeText(secret)
  emit('copied')
}
</script>

<template>
  <div v-if="!domain?.secret" class="flex flex-col gap-4">
    <h1>New Domain</h1>
    <form class="flex flex-col justify-center items-center gap-6">
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
</template>
