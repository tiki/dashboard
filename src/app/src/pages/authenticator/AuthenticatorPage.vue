<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue'
import AuthInfo from './AuthInfo.vue'
</script>

<template>
  <div class="flex justify-center p-[4.5rem] items-center h-screen">
    <AuthInfo />
    <div class="flex flex-col p-[3.5rem] items-start justify-start gap-[2.625rem] flex-1">
      <authenticator
        :sign-up-attributes="['given_name', 'family_name']"
        :social-providers="['amazon', 'google']"
      ></authenticator>
    </div>
  </div>
</template>
