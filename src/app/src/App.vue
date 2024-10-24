<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import MainLayout from './layouts/Main/MainLayout.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

const auth = useAuthenticator()

const router = useRouter()

const signOut = () => {
  auth.signOut()
  router.push('/login')
}
</script>

<template>
  <MainLayout v-if="auth.user" :user="auth.user" @logout="signOut" />
  <RouterView />
</template>
