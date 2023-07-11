import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showQuoteAddedModal: false,
    showAddQuoteFromMoviesModal: false,
    showAddQuotesModal: false,
    showMovieAddedModal: false,
    showAddMoviesModal: false,
    showEditQuoteModal: false,
    showViewQuoteModal: false,
    showEditMovieModal: false,
    showMovieDeletedModal: false,
    showQuoteDeletedModal: false,
    showCommentAddedModal: false
  }),
  actions: {
    toggleQuoteAddedModal() {
      this.showQuoteAddedModal = !this.showQuoteAddedModal
    },
    toggleEditModal() {
      this.showEditMovieModal = !this.showEditMovieModal
    },
    toggleMovieDeletedModal() {
      this.showMovieDeletedModal = !this.showMovieDeletedModal
    },
    toggleAddQuoteFromMovie() {
      this.showAddQuoteFromMoviesModal = !this.showAddQuoteFromMoviesModal
    },
    toggleAddQuotesModal() {
      this.showAddQuotesModal = !this.showAddQuotesModal
    },
    toggleEditQuoteModal() {
      this.showEditQuoteModal = !this.showEditQuoteModal
    },
    toggleQuoteDeletedModal() {
      this.showQuoteDeletedModal = !this.showQuoteDeletedModal
    },
    toggleMovieAddedModal() {
      this.showMovieAddedModal = !this.showMovieAddedModal
    },
    toggleAddMoviesModal() {
      this.showAddMoviesModal = !this.showAddMoviesModal
    },
    toggleViewQuoteModal() {
      this.showViewQuoteModal = !this.showViewQuoteModal
    },
    toggleCommentAddedModal() {
      this.showCommentAddedModal = !this.showCommentAddedModal
    }
  }
})