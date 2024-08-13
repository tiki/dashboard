import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../LoginPage/LoginPage.vue'
import RequestsPage from '../RequestsPage/RequestsPage.vue'
import ThreadPage from '../ThreadPage/ThreadPage.vue'
import DatasetsPage from '../DatasetsPage/DatasetsPage.vue'
import OrganizationPage from '../OrganizationPage/OrganizationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'organizations' }
    },
    {
      path: '/messages',
      name: 'messages',
      children: [
        {
          path: 'requests',
          name: 'my requests',
          component: RequestsPage
        },
        {
          path: 'request/:id',
          name: 'request',
          component: ThreadPage
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
          component: OrganizationPage
        }
      ]
    },
    {
      path: '/data-publishing',
      name: 'data publishing',
      children: [
        {
          path: 'datasets',
          name: 'datasets',
          component: DatasetsPage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { sidebar: false }
    }
  ]
})

export default router
