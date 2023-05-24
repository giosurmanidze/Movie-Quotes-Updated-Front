<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-[#DDCCAA]">{{ $t('movie_quotes') }}</span>
    <div class="flex items-center gap-6 text-[#fff]">
      <lang-changer />
      <Button type="button" text="sign_up" classes="bg-[#E31221]" @click="showModal = 'sign-up'" />
      <Button
        type="button"
        text="log_in_btn"
        classes="border-2 border-[#fff]"
        @click="showModal = 'login'"
      />
    </div>
    <div
      v-if="showModal === 'sign-up'"
      class="fixed inset-0 flex justify-center items-center blur-bg"
      @click="showModal = ''"
    >
      <signup-form :showModal="updateShowModal" />
    </div>
    <div
      v-if="showModal === 'login'"
      class="fixed inset-0 flex justify-center items-center blur-bg"
      @click="showModal = ''"
    >
      <login-form :showModal="updateShowModal" />
    </div>
  </div>
</template>

<script setup>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from './LoginForm.vue'
import Button from './Button.vue'
import LangChanger from './LangChanger.vue'
import { ref } from 'vue'

const showModal = ref('')

const updateShowModal = (value) => {
  showModal.value = value
}
</script>

<style scoped>
@media screen and (min-width: 340px) {
  .modal-content {
    max-width: 600px;
    max-height: 80vh;
  }
}
.blur-bg {
  background: rgba(0, 0, 0, 0.54);
  backdrop-filter: blur(3px);
}
</style>
