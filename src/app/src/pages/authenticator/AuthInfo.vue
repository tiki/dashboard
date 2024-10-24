<script setup lang="ts">
import InfoFeature from './InfoFeature.vue'
const features = [
  {
    icon: 'inbox',
    title: 'Create Data Products',
    subtitle:
      'Connect your raw data to transform, sell, and deliver production-grade data assets to data buyers.'
  },
  {
    icon: 'shield',
    title: 'Manage Legal Compliance',
    subtitle:
      'Built-in legal auditing and privacy protection tools like PII redaction and de-identification.'
  },
  {
    icon: 'globe',
    title: 'Connect With Data Buyers',
    subtitle:
      'Tap into our network of qualified data buyers to build direct, profitable relationships with pros.'
  }
]
</script>

<template>
  <div
    class="hidden sm:flex flex-col items-start justify-start gap-[2.1875rem] p-14 flex-1 self-stretch"
  >
    <img src="../../assets/images/beehiv-logo.svg" alt="" class="" />
    <div class="flex flex-col items-start gap-[0.4375rem] self-stretch">
      <h1 class="text-[1.09375rem] font-semibold text-[#1C0000]">Welcome to Tiki</h1>
      <p class="text-[0.875rem] font-normal text-[#505C59] leading-[1.3125rem]">
        Unlock your most valuable asset.
      </p>
    </div>
    <div class="flex flex-col items-start gap-[1.3125rem] self-stretch mb-[15rem]">
      <InfoFeature v-for="feature in features" :key="feature.title" v-bind="feature" />
    </div>
  </div>
</template>
