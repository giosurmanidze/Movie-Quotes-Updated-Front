import { defineStore } from 'pinia'

export const useProfilePageStore = defineStore('useProfilePageStore', {
  state: () => ({
    showForm: true
  }),
  actions: {
    toggleShowForm() {
      this.showForm = !this.showForm
    },
    setShowValue(value) {
      this.showForm = value
    }
  }
})
