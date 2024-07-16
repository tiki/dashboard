<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import { ref } from 'vue'

const selectedCity = ref()
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
</script>

<template>
  <div class="ml-[15rem] flex justify-center items-center h-screen flex-col gap-4">
    <h1 class="text-3xl uppercase text-dark-blue font-bold">create a new request</h1>
    <form class="flex flex-col justify-center items-center gap-6">
      <InputText placeholder="Title" class="w-full" />
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a subject"
        class="w-full"
      />
      <FloatLabel>
        <Textarea rows="5" cols="30" />
        <label>Message</label>
      </FloatLabel>
      <Button label="Submit" severity="success" class="w-full" />
    </form>
  </div>
</template>
