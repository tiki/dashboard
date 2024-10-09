<script setup lang="ts">
import Dialog from 'primevue/dialog'
defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Dialog v-bind:visible="isVisible" modal header="You did it!" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-4 items-center justify-center">
      <div
        class="border-2 border-solid border-tiki-green rounded-full flex items-center justify-center p-8"
      >
        <i class="pi pi-check text-tiki-green"></i>
      </div>

      <div class="text-surface-500 dark:text-surface-400 block mb-8">
        We got your information. Now if you want to increment your report, keep filling the form!
      </div>
    </div>
  </Dialog>
</template>
