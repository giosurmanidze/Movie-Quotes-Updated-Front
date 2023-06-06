import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'
import SuccessVerifiedEmail from '@/pages/SuccessVerifiedEmail.vue'
import LoginForm from '@/pages/LoginForm.vue'
import SignupForm from '@/pages/SignupForm.vue'
import SentEmail from '@/pages/SentEmail.vue'
import NewsFeedPage from '@/pages/Auth/NewsFeedPage.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import RecoverInstructions from '@/pages/RecoverInstructions.vue'
import CreatePassword from '@/pages/CreatePassword.vue'
import ChangedPassword from '@/pages/CreatePassword.vue'
import MovieList from '@/pages/Auth/MovieList.vue'

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
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword
        },
        {
          path: '/recover-instructions',
          name: 'recoverInstructions',
          component: RecoverInstructions
        },
        {
          path: '/reset-password',
          name: 'resetPassword',
          component: CreatePassword
        },
        {
          path: '/changed-password',
          name: 'changedPassword',
          component: ChangedPassword
        }
      ]
    },
    {
      path: '/news-feed',
      name: 'newsFeed',
      component: NewsFeedPage
    },
    {
      path: '/movie-list',
      name: 'movieList',
      component: MovieList
    }
  ]
})

export default router
