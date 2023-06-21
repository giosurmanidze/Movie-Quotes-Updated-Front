import { defineStore } from 'pinia'
import axios from '@/config/axios/auth-index'

export const useQuotesStore = defineStore('useQuotesStore', {
  state: () => ({
    quotes: [],
    quote: [],
    page: 1,
    searchQuery: null,
    loading: false
  }),
  actions: {
    getQuotes() {
      if (this.loading || this.quotes.length > 0) {
        return
      }
      this.loading = true
      axios.get('api/quotes?page=' + this.page++).then((response) => {
        this.quotes.push(...response.data)
        this.loading = false
      })
    },
    getQuotesRefresh() {
      axios.post('api/quotes-refresh', this.quotes.length).then((response) => {
        this.quotes = response.data
      })
    },
    getQuote(id) {
      axios
        .get(`api/quotes/${id}`)
        .then((response) => {
          this.quote = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteQuote(id) {
      axios
        .delete(`api/quotes/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
