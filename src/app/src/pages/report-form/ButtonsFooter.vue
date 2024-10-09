<script setup lang="ts">
import Button from 'primevue/button'
defineProps({
  hasBack: {
    type: Boolean,
    required: true
  },
  hasNext: {
    type: Boolean,
    required: true
  }
})
defineEmits(['back', 'next'])
</script>

<template>
  <div class="flex justify-between">
    <div class="w-1/2">
      <Button
        v-if="hasBack"
        label="Back"
        severity="secondary"
        icon="pi pi-arrow-left"
        @click="$emit('back')"
      />
    </div>

    <div class="w-1/2 text-right">
      <Button
        v-if="hasNext"
        label="Next"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>
