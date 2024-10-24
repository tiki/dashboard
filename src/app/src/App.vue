<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from './layouts/Main/MainLayout.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

const auth = useAuthenticator()
</script>

<template>
  <MainLayout v-if="auth.user" :user="auth.user" @logout="auth.signOut()" />
  <RouterView />
</template>
