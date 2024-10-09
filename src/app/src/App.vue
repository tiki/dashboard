<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from './layouts/Main/MainLayout.vue'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'

const auth = useAuthenticator()
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
</script>

<template>
  <div
    class="flex flex-col gap-4 items-center justify-center h-screen"
    v-if="auth.route !== 'authenticated' && currentRoute.path !== '/report-form'"
  >
    <img src="./assets/images/tiki-logo.svg" alt="" class="w-24" />
    <authenticator :sign-up-attributes="['given_name', 'family_name']"></authenticator>
  </div>
  <template v-if="auth.route !== 'authenticated' && currentRoute.path === '/report-form'">
    <RouterView
  /></template>
  <template v-if="auth.route === 'authenticated'">
    <MainLayout :user="auth.user" @logout="auth.signOut()" />
    <RouterView />
  </template>
</template>
