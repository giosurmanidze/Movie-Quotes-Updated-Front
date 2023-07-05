import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
import { useI18n } from 'vue-i18n'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    searchValue: '',
    locale: useI18n({ useScope: 'global' })['locale']
  }),
  actions: {
    async getPosts() {
      if (this.searchValue) {
        const response = await axios.get(`api/quote-search`, {
          params: {
            search: this.searchValue
          }
        })
        this.posts.push(...response.data)
      } else {
        try {
          const response = await axios.get(`api/quotes`)
          if (response.data.length) {
          }
          this.posts.push(...response.data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    handleScroll() {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight &&
        this.posts.length < this.totalPosts 
      ) {
        this.getPosts()
      }
    },
    async refreshPosts() {
      try {
        const response = await axios.get(`api/quotes`)
        this.posts = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async searchPosts() {
      if (this.searchValue === '') {
        this.refreshPosts()
      } else {
        try {
          const response = await axios.get(`api/quote-search`, {
            params: {
              search: this.searchValue
            }
          })
          this.posts = response.data
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
