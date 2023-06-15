import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showQuoteAddedModal: false,
    showCommentAddedModal: false,
    showAddQuotesModal: false,
    showMovieAddedModal:false,
    showAddMoviesModal:false,
    showEditQuoteModal: false,
    showViewQuoteModal:false
  }),
  actions: {
    toggleQuoteAddedModal() {
      this.showQuoteAddedModal = !this.showQuoteAddedModal
    },
    toggleCommentAddedModal() {
      this.showCommentAddedModal = !this.showCommentAddedModal
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
