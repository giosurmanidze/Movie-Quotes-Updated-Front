<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-[#DDCCAA]">{{ $t('movie_quotes') }}</span>
    <div class="flex items-center gap-6 text-[#fff]">
      <lang-changer />
      <Button
        type="button"
        text="sign_up"
        classes="bg-[#E31221]"
        @click="showSignUpModal = 'sign-up'"
      />
      <Button
        type="button"
        text="login"
        classes="border-2 border-[#fff]"
        @click="showSignUpModal = 'login'"
      />
    </div>
    <div
      v-if="showSignUpModal === 'sign-up'"
      class="fixed inset-0 flex justify-center items-center blur-bg"
      @click="showSignUpModal = false"
    >
      <signup-form />
    </div>
    <div
      v-if="showSignUpModal === 'login'"
      class="fixed inset-0 flex justify-center items-center blur-bg"
      @click="showSignUpModal = false"
    >
      <login-form />
    </div>
  </div>
</template>

<script setup>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from './LoginForm.vue'
import Button from './Button.vue'
import LangChanger from './LangChanger.vue'
import { ref } from 'vue'

const showSignUpModal = ref('')
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
