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
import UserProfile from '@/pages/Auth/UserProfile.vue'
import SingleMovie from '@/pages/Auth/SingleMovie.vue'
import { useAuthStore } from '@/stores/useAuthStore.js'
import isAuthenticated from '@/router/auth-guard.js'
import isNotAuthenticated from '@/router/unauth-guard.js'
import Forbidden from '@/pages/ErrorPages/Forbidden.vue'
import NotFound from '@/pages/ErrorPages/NotFound.vue'
import axios from '@/config/axios/index.js'

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
          component: LoginForm,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignupForm,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/success',
          name: 'success',
          component: SuccessVerifiedEmail,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/sent-email',
          name: 'sentEmail',
          component: SentEmail,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/recover-instructions',
          name: 'recoverInstructions',
          component: RecoverInstructions,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/reset-password',
          name: 'resetPassword',
          component: CreatePassword,
          beforeEnter: isNotAuthenticated
        },
        {
          path: '/changed-password',
          name: 'changedPassword',
          component: ChangedPassword,
          beforeEnter: isNotAuthenticated
        }
      ]
    },
    {
      path: '/news-feed',
      name: 'newsFeed',
      component: NewsFeedPage,
      beforeEnter: isAuthenticated
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: Forbidden
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/movie-list',
      name: 'movieList',
      component: MovieList,
      beforeEnter: isAuthenticated
    },
    {
      path: '/movie/:id',
      name: 'moviePage',
      component: SingleMovie,
      beforeEnter: isAuthenticated
    },
    {
      path: '/user-profile',
      name: 'userProfile',
      component: UserProfile,
      beforeEnter: isAuthenticated
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.authenticated === null) {
    try {
      await axios.get(`api/user`)
      authStore.authenticated = true
    } catch (err) {
      authStore.authenticated = false
    } finally {
      return next()
    }
  }
  return next()
})

export default router
