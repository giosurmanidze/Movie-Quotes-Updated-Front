import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../pages/Landing.vue'
import SuccessVerifiedEmail from '../pages/SuccessVerifiedEmail.vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
import SentEmail from '../components/SentEmail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginForm
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignupForm
        },
        {
          path: '/success',
          name: 'success',
          component: SuccessVerifiedEmail
        },
        {
          path: '/sent-email',
          name: 'sentEmail',
          component: SentEmail
        }
      ]
    }
  ]
})

export default router
