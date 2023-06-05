import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    setIsAuthenticated(value) {
      this.isAuthenticated = value
    }
  }
})
