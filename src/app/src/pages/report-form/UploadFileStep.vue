<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

const toast = useToast()
defineProps({
  step: {
    type: Number,
    required: true
  }
})

defineEmits(['back', 'next'])

const onAdvancedUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Toast />
    <FileUpload
      name="dataReportFiles[]"
      url="/api/upload"
      @upload="onAdvancedUpload()"
      :multiple="true"
      :maxFileSize="1000000"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
    <div class="flex justify-between">
      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        label="Next"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="$emit('next')"
        v-if="step !== 3"
      />
    </div>
  </div>
</template>
