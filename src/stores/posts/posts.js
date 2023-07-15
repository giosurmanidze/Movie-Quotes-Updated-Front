import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { getPosts, handleScroll, refreshPosts, searchPosts } from './actions'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    searchValue: '',
    locale: useI18n({ useScope: 'global' })['locale']
  }),
  actions: {
    getPosts,
    handleScroll,
    refreshPosts,
    searchPosts
  }
})
