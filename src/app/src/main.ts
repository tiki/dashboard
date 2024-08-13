import { createApp } from 'vue'
import PrimeVue from '@primevue/core/config'
import App from './App.vue'
import Aura from '@primevue/themes/aura'
import router from './router'
import 'primeicons/primeicons.css'
import AmplifyVue from '@aws-amplify/ui-vue'

import '@/assets/main.css'
import '@aws-amplify/ui-vue/styles.css'

import { Amplify } from 'aws-amplify'

console.log(import.meta.env.VITE_USER_POOL_ID)
console.log(import.meta.env.VITE_USER_POOL_CLIENT_ID)

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      identityPoolId: '',
      loginWith: {
        email: true
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true
        }
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 16,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true
      }
    }
  }
})

const app = createApp(App)

app.use(router)

app.use(AmplifyVue)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'selector',
      cssLayer: { name: 'primeVue' }
    }
  }
})

app.mount('#app')
