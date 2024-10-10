<script setup lang="ts">
import ButtonsFooter from './ButtonsFooter.vue'

defineEmits(['next'])
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">Your Responsibilities</h1>
      <ul class="list-disc leading-8 px-8 text-lg font-normal">
        <li>
          Sign the Evaluation Agreement, allowing us to use your data solely for non-commercial
          evaluation purposes.
        </li>
        <li>
          Submit a small sample dataset (~100 records recommended). You can upload multiple files in
          the section three.
        </li>
        <li>
          Provide any relevant legal documents, such as Terms of Service, privacy policies, or other
          applicable agreements.
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">Our Deliverables</h1>
      <ul class="list-disc leading-8 px-8 text-lg font-normal">
        <li>
          Detailed data taxonomy and accompanying documentation derived from your sample data.
        </li>
        <li>
          A legal review of your provided agreements, with a focus on data commercialization
          potential.
        </li>
        <li>Insights from our data buyer network, gauging interest in your data offering.</li>
        <li>A thorough review of competitors, pricing strategies, and key market requirements.</li>
      </ul>
    </div>
    <ButtonsFooter :hasBack="false" @next="$emit('next')" />
  </div>
</template>
