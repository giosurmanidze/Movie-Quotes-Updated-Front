import { defineStore } from 'pinia'
import { getNotifications } from './actions'

export const useNotifications = defineStore('notification', {
  state: () => ({
    notifications: []
  }),
  actions: {
    getNotifications
  }
})
