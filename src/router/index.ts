import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../LoginPage/LoginPage.vue'
import HomePage from '../HomePage/HomePage.vue'
import NewRequestPage from '../NewRequestPage/NewRequestPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/messages',
      name: 'messages',
      children: [
        {
          path: 'new-request',
          name: 'new request',
          component: NewRequestPage
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

router.beforeEach(async (to, from) => {
  const token = sessionStorage.getItem('token')
  if (!token && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
