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

<style>
[data-amplify-authenticator] {
  --amplify-components-input-border-color: #1c0000;
  --amplify-components-input-border-width: 2px;
}
.amplify-input {
  border-width: 2px !important;
}
.amplify-field-group__outer-end button {
  border-width: 2px !important;
  border-color: #1c0000 !important;
  border-left: 0;
}

.amplify-authenticator__federated-button {
  border-width: 2px !important;
  border-color: #1c0000 !important;
  font-weight: 800 !important;
  color: #1c0000 !important;
  font-size: 1rem !important;
}

.amplify-button--link {
  color: #00b272 !important;
  height: 1.1875rem !important;
  font-size: 0.875rem !important;
  font-weight: 800 !important;
}

.amplify-button--link:hover {
  background-color: white !important;
}

.amplify-heading--3 {
  text-align: center !important;
  font-size: 2rem !important;
  font-weight: 800 !important;
  color: var(--Dark-Gray, #505c59) !important;
}
</style>
