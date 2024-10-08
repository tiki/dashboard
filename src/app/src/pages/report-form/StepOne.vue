<script setup lang="ts">
import ButtonsFooter from './ButtonsFooter.vue'

defineEmits(['next'])
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">Requiments (you)</h1>
      <ul class="list-disc leading-8 px-8 text-lg font-normal">
        <li>Sign Evaluation agreement to share data for eval-only, non-commercial purpose.</li>
        <li>A very small set of sample data (~100 records).</li>
        <li>Any applicable legal agreements, ToS, privacy policy, etc.</li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">Deliverables (us)</h1>
      <ul class="list-disc leading-8 px-8 text-lg font-normal">
        <li>Data taxonomy and docs derived from the sample data.</li>
        <li>Legal review of agreements from a data commercialization lens.</li>
        <li>Survey our data buyer network to gauge interest.</li>
        <li>Review of competitors, pricing, and market requirements.</li>
      </ul>
    </div>
    <ButtonsFooter :hasBack="false" :hasNext="true" @next="$emit('next')" />
  </div>
</template>
