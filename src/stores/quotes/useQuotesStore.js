import { defineStore } from 'pinia'
import { getQuotes, getQuotesRefresh, getQuote, deleteQuote } from './actions'

export const useQuotesStore = defineStore('useQuotesStore', {
  state: () => ({
    quotes: [],
    quote: null,
    page: 1,
    searchQuery: null,
    loading: false
  }),
  actions: { getQuotes, getQuotesRefresh, getQuote, deleteQuote }
})
