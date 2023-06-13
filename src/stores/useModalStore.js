import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showQuoteAddedModal: false,
    showCommentAddedModal: false,
    showAddQuotesModal: false
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
    }
  }
})
