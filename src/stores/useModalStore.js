import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showQuoteAddedModal: false,
    showCommentAddedModal: false,
    showAddQuotesModal: false,
    showMovieAddedModal:false,
    showAddMoviesModal:false,
    showEditQuoteModal: false,
    showViewQuoteModal:false,
    showEditMovieModal:false,
    showMovieDeletedModal:false
  }),
  actions: {
    toggleQuoteAddedModal() {
      this.showQuoteAddedModal = !this.showQuoteAddedModal
    },
    toggleEditModal() {
      this.showEditMovieModal = !this.showEditMovieModal;
    },
    toggleCommentAddedModal() {
      this.showCommentAddedModal = !this.showCommentAddedModal
    },
    toggleMovieDeletedModal() {
      this.showMovieDeletedModal = !this.showMovieDeletedModal;
    },
    toggleAddQuotesModal() {
      this.showAddQuotesModal = !this.showAddQuotesModal
    },
    toggleEditQuoteModal() {
      this.showEditQuoteModal = !this.showEditQuoteModal;
    },
    toggleMovieAddedModal() {
      this.showMovieAddedModal = !this.showMovieAddedModal;
    },
    toggleAddMoviesModal() {
      this.showAddMoviesModal = !this.showAddMoviesModal;
    },  toggleViewQuoteModal() {
      this.showViewQuoteModal = !this.showViewQuoteModal;
    },
  }
})
