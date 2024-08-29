import { createApp } from 'vue'
import PrimeVue from '@primevue/core/config'
import App from './App.vue'
import Aura from '@primevue/themes/aura'
import router from './router'
import 'primeicons/primeicons.css'
import AmplifyVue from '@aws-amplify/ui-vue'
import Tooltip from 'primevue/tooltip'
import '@/assets/main.css'
import '@aws-amplify/ui-vue/styles.css'
import { amplify } from './services'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

amplify.configure()

app.directive('tooltip', Tooltip)

app.use(router)
app.use(AmplifyVue)
app.use(ToastService)
app.use(ConfirmationService)
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
