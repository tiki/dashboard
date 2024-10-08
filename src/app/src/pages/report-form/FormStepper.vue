<script setup lang="ts">
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import StepOne from './StepOne.vue'
import ProgressDialog from './ProgressDialog.vue'
import { ref } from 'vue'
import UploadFileStep from './UploadFileStep.vue'

const isVisible = ref<boolean>(false)
</script>

<template>
  <div class="card flex justify-center">
    <ProgressDialog :is-visible="isVisible" @update:visible="isVisible = !isVisible" />
    <Stepper value="1" class="basis-[50rem]">
      <StepList>
        <Step value="1">Company Information</Step>
        <Step value="2">Data Samples</Step>
        <Step value="3">Legal Documentation</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <StepOne
            @next="
              () => {
                isVisible = true
                activateCallback('2')
              }
            "
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <UploadFileStep
            :step="2"
            @back="activateCallback('1')"
            @next="
              () => {
                isVisible = true
                activateCallback('3')
              }
            "
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <UploadFileStep :step="3" @back="activateCallback('2')" />
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>
