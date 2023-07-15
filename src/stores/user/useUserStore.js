import { defineStore } from 'pinia'
import { getUser } from './actions'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: [],
    userAvatar: ''
  }),
  actions: { getUser }
})
