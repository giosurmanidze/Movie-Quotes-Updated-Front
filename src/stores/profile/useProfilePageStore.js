import { defineStore } from 'pinia'

export const useProfilePageStore = defineStore('useProfilePageStore', {
  state: () => ({
    showForm: true,
    showSuccessfullEditModal: false,
    usernameEdited: false,
    passwordEdited: false,
    showUsernameAlert: false,
    showEmailAlert: false,
    showPassowrdAlert: false,
    showAvatarAlert: false
  }),
  actions: {
    toggleShowForm() {
      this.showForm = !this.showForm
    },
    toggleShowModal(value) {
      this.showSuccessfullEditModal = value
    },
    toggleUsernameEdited(value) {
      this.usernameEdited = value
    },
    togglePasswordEdited(value) {
      this.passwordEdited = value
    },
    toggleShowUsernameAlert(value) {
      this.showUsernameAlert = value
    },
    toggleShowEmailAlert(value) {
      this.showEmailAlert = value
    },
    toggleShowPassowrdAlert(value) {
      this.showPassowrdAlert = value
    },
    toggleShowAvatarAlert(value) {
      this.showAvatarAlert = value
    }
  }
})
