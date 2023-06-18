import { defineStore } from 'pinia'
import axios from '@/config/axios/auth-index';

export const useQuotesStore = defineStore('useQuotesStore', {
  state: () => ({
    quotes: [],
    quote: [],
    page: 1,
    searchQuery: null
  }),
  actions: {
    getQuotes() {
      axios.get("api/quotes?page=" + this.page++).then((response) => {
        this.quotes.push(...response.data);
      });
    },
  }
})
