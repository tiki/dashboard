<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import { ref } from 'vue'
import Dialog from 'primevue/dialog'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})
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
  <Dialog v-bind:visible="isVisible" modal header="New Request" :style="{ width: '30rem' }">
    <div>
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
          <Textarea rows="5" cols="47" />
          <label>Message</label>
        </FloatLabel>
        <Button
          label="Submit"
          severity="success"
          class="w-full"
          style="background-color: #00b272"
        />
      </form>
    </div>
  </Dialog>
</template>
