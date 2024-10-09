<script setup lang="ts">
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import ButtonsFooter from './ButtonsFooter.vue'
import { ref } from 'vue'

defineEmits(['next', 'back'])

const name = ref<string>('')
const companyName = ref<string>('')
const email = ref<string>('')
const website = ref<string>('')
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
    <ButtonsFooter :hasBack="true" :hasNext="true" @next="$emit('next')" @back="$emit('back')" />
  </form>
</template>
