import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useControllDialogs = defineStore('dialogs', () => {
  const dialog = ref('')
  return { dialog }
})
