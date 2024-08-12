<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Dialog v-bind:visible="isVisible" modal header="New Organization" :style="{ width: '30rem' }">
    <div>
      <form class="flex flex-col justify-center items-center gap-6">
        <InputText class="w-full" placeholder="Name" />
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
