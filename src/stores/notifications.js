import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'

export const useNotifications = defineStore('notification', {
  state: () => ({
    notifications: []
  }),
  actions: {
    async getNotifications() {
      try {
        const response = await axios.get(`api/get-notifications`)
        this.notifications = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
