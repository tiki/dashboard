<script setup lang="ts">
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import AuthInfo from './AuthInfo.vue'
import { toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'

const { route } = toRefs(useAuthenticator())

const router = useRouter()

watch(
  () => route.value,
  (route) => {
    if (route === 'authenticated') {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const redirect = urlParams.get('redirect')
      const routeToPush = redirect ?? '/'
      router.push(routeToPush)
    }
  }
)
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
