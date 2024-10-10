<script setup lang="ts">
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import ProgressDialog from './ProgressDialog.vue'
import { ref, reactive } from 'vue'

import StepOne from './StepOne.vue'
import UploadFileStep from './UploadFileStep.vue'
import StepTwo from './StepTwo.vue'
import type FormReq from './types/formReq'

const reqData = reactive<FormReq>({
  name: '',
  companyName: '',
  email: '',
  website: '',
  dataSamples: [],
  legalDocuments: []
})

const isVisible = ref<boolean>(false)

const updateData = (data: FormReq) => {
  Object.assign(reqData, data)
  isVisible.value = true
}

const submit = () => {
  console.log(reqData)
}
</script>

<template>
  <div class="card flex justify-center">
    <ProgressDialog :is-visible="isVisible" @update:visible="isVisible = !isVisible" />
    <Stepper value="1" class="basis-auto flex-col" linear>
      <StepList class="flex flex-col sm:flex-row">
        <Step value="1">Getting Started</Step>
        <Step value="2">Company Information</Step>
        <Step value="3">Data Samples</Step>
        <Step value="4">Legal Documentation</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <StepOne @next="activateCallback('2')" />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <StepTwo
            @back="activateCallback('1')"
            @next="
              (data: FormReq) => {
                updateData(data)
                activateCallback('3')
              }
            "
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <UploadFileStep
            :step="3"
            @back="activateCallback('2')"
            @upload="
              (data: File[]) => {
                reqData.dataSamples = data
              }
            "
            @next="
              () => {
                isVisible = true
                activateCallback('4')
              }
            "
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="4">
          <UploadFileStep
            :step="4"
            @back="activateCallback('3')"
            @upload="(data: File[]) => (reqData.legalDocuments = data)"
            @next="submit"
          />
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>
