import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    user: [],
    userAvatar: ''
  }),
  actions: {
    getUser() {
      axios.get('api/user').then((response) => {
        this.user = response.data
        if (!response.data.profile_picture) {
          this.userAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        } else {
          this.userAvatar = backendUrl + response.data.profile_picture
        }
      })
    }
  }
})
