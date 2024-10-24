import { createRouter, createWebHistory } from 'vue-router'
import RequestsPage from '../pages/requests/RequestsPage.vue'
import ThreadPage from '../pages/requests/RequestsThreadPage.vue'
import DatasetsPage from '../pages/data-publishing/Datasets/DatasetsPage.vue'
import OrganizationPage from '../pages/account/Organizations/OrganizationsPage.vue'
import GettingStartedPage from '@/pages/data-publishing/GettingStarted/GettingStartedPage.vue'
import LagoonPage from '@/pages/data-publishing/Lagoon/LagoonPage.vue'
import ReportFormPage from '@/pages/report-form/ReportFormPage.vue'
import AuthenticatorPage from '@/pages/authenticator/AuthenticatorPage.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

const auth = useAuthenticator()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthenticatorPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/report-form',
      name: 'report form',
      component: ReportFormPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      redirect: { name: 'organizations' },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messages',
      name: 'messages',
      children: [
        {
          path: 'requests',
          name: 'my requests',
          component: RequestsPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'request/:id',
          name: 'request',
          component: ThreadPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      children: [
        {
          path: 'organizations',
          name: 'organizations',
          component: OrganizationPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/data-publishing',
      name: 'data publishing',
      children: [
        {
          path: 'getting-started',
          name: 'getting started',
          component: GettingStartedPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'lagoon',
          name: 'lagoon',
          component: LagoonPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'datasets',
          name: 'datasets',
          component: DatasetsPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && auth.route !== 'authenticated') {
    auth.signOut()
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
