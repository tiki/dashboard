<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import { ref } from 'vue'
import Toast from 'primevue/toast'
import ButtonsFooter from './ButtonsFooter.vue'

const toast = useToast()
defineProps({
  step: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['back', 'next', 'upload'])

const dataSamples = ref<File[]>([])

const onFileSelect = (event: any) => {
  const file = event.files[0]
  dataSamples.value.push(file)
}

const onUpload = () => {
  emit('upload', dataSamples.value)
  toast.add({ severity: 'success', summary: 'Success', detail: 'Files Uploaded', life: 3000 })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Toast />
    <FileUpload
      name="dataReportFiles[]"
      @select="onFileSelect"
      @upload="onUpload"
      :customUpload="true"
      @uploader="onUpload"
      :multiple="true"
      :maxFileSize="1000000"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
    <ButtonsFooter
      :hasBack="true"
      :isSubmit="step === 4"
      @next="$emit('next')"
      @back="$emit('back')"
    />
  </div>
</template>
