<script setup lang="ts">
defineProps({
  icon: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  subtitle: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="flex items-start gap-[0.875rem] self-stretch">
    <div
      class="flex justify-center items-center w-[2.375rem] h-[2.375rem] rounded-[0.625rem] bg-[#FFE68F]"
    >
      <i :class="`pi pi-${icon}`" />
    </div>
    <div class="flex flex-col items-start gap-[0.4375rem] flex-1">
      <h2 class="text-[0.875rem] font-medium text-tiki-black">
        {{ title }}
      </h2>
      <p class="text-[0.875rem] font-normal text-tiki-gray leading-[1.3125rem]">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
