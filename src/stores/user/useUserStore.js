import { defineStore } from 'pinia'
import { getUserData } from '@/services/requests/sendRequest'

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    user: [],
    userAvatar: ''
  }),
  actions: {
    async getUser() {
      try {
        const response = await getUserData() 
        this.user = response.data
        if (!response.data.profile_picture) {
          this.userAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        } else {
          this.userAvatar = backendUrl + response.data.profile_picture
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
