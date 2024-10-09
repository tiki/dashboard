<script setup lang="ts">
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

import ButtonsFooter from './ButtonsFooter.vue'

import { ref } from 'vue'

const emits = defineEmits(['next', 'back'])

const error = ref<string>('')

const name = ref<string>('')
const companyName = ref<string>('')
const email = ref<string>('')
const website = ref<string>('')

const validateForm = () => {
  if (!name.value || !companyName.value || !email.value || !website.value) {
    return false
  }
  return true
}

const onNext = () => {
  if (validateForm()) {
    const data = {
      name: name.value,
      companyName: companyName.value,
      email: email.value,
      website: website.value
    }
    return emits('next', data)
  }
  return (error.value = 'All fields are required!')
}
</script>

<template>
  <form action="" class="flex flex-col gap-8 w-full mt-4">
    <FloatLabel class="flex flex-col">
      <InputText id="name" class="w-full" v-model="name" />
      <label for="name">Full name</label>
    </FloatLabel>
    <FloatLabel class="flex flex-col">
      <InputText id="companyName" class="w-full" v-model="companyName" />
      <label for="companyName">Company name</label>
    </FloatLabel>
    <FloatLabel>
      <InputText id="email" class="w-full" v-model="email" />
      <label for="email">Email</label>
    </FloatLabel>
    <FloatLabel>
      <InputText id="website" class="w-full" v-model="website" />
      <label for="website">Website Url</label>
    </FloatLabel>
    <Message severity="error" v-if="error">{{ error }}</Message>
    <ButtonsFooter :hasBack="true" :hasNext="true" @next="onNext" @back="$emit('back')" />
  </form>
</template>
