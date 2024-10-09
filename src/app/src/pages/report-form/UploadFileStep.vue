<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ButtonsFooter from './ButtonsFooter.vue'

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
    <ButtonsFooter
      :hasBack="true"
      :hasNext="step === 4 ? false : true"
      @next="$emit('next')"
      @back="$emit('back')"
    />
  </div>
</template>
