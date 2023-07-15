import { defineStore } from 'pinia'
import {
  toggleShowForm,
  toggleShowModal,
  toggleUsernameEdited,
  togglePasswordEdited,
  toggleShowUsernameAlert,
  toggleShowEmailAlert,
  toggleShowPassowrdAlert,
  toggleShowAvatarAlert
} from './actions'

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
    toggleShowForm,
    toggleShowModal,
    toggleUsernameEdited,
    togglePasswordEdited,
    toggleShowUsernameAlert,
    toggleShowEmailAlert,
    toggleShowPassowrdAlert,
    toggleShowAvatarAlert
  }
})
