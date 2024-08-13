import { createRouter, createWebHistory } from 'vue-router'
import RequestsPage from '../pages/Requests/RequestsPage.vue'
import ThreadPage from '../pages/Requests/RequestsThreadPage.vue'
import DatasetsPage from '../pages/Datasets/DatasetsPage.vue'
import OrganizationPage from '../pages/Organizations/OrganizationsPage.vue'

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
    }
  ]
})

export default router
