import { useAuthStore } from '@/stores/auth/useAuthStore'

export const isAuthenticated = () => {
  const authStore = useAuthStore()
  if (!authStore.authenticated) {
    return 'forbidden'
  }
}

export const isNotAuthenticated = () => {
  const authStore = useAuthStore()
  if (authStore.authenticated) {
    authStore.isNotAuthenticated = false
    return 'forbidden'
  }
}
