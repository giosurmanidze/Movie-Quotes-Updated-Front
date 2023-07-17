import { defineStore } from 'pinia'
import {
  toggleQuoteAddedModal,
  toggleEditModal,
  toggleMovieDeletedModal,
  toggleAddQuoteFromMovie,
  toggleAddQuotesModal,
  toggleEditQuoteModal,
  toggleQuoteDeletedModal,
  toggleMovieAddedModal,
  toggleAddMoviesModal,
  toggleViewQuoteModal,
  toggleCommentAddedModal
} from './actions.js'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showQuoteAddedModal: false,
    showAddQuoteFromMoviesModal: JSON.parse(localStorage.getItem('showAddQuoteFromMoviesModal')),
    showAddQuotesModal: JSON.parse(localStorage.getItem('showQuoteAddModal')),
    showMovieAddedModal: false,
    showAddMoviesModal: JSON.parse(localStorage.getItem('showMovieAddModal')),
    showEditQuoteModal: JSON.parse(localStorage.getItem('showEditQuoteModal')),
    showViewQuoteModal: JSON.parse(localStorage.getItem('showViewQuoteModal')),
    showEditMovieModal: JSON.parse(localStorage.getItem('showEditMovieModal')),
    showMovieDeletedModal: false,
    showQuoteDeletedModal: false,
    showCommentAddedModal: false
  }),
  actions: {
    toggleQuoteAddedModal,
    toggleEditModal,
    toggleMovieDeletedModal,
    toggleAddQuoteFromMovie,
    toggleAddQuotesModal,
    toggleEditQuoteModal,
    toggleQuoteDeletedModal,
    toggleMovieAddedModal,
    toggleAddMoviesModal,
    toggleViewQuoteModal,
    toggleCommentAddedModal
  }
})
