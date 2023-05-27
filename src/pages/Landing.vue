<template>
  <div class="lg:block">
    <div class="h-[80vh] bg-banner_gradient pt-8 px-8 lg:px-16">
      <Header />
      <div
        v-if="dialogStore.dialog === 'signup'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="dialogStore.dialog = ''"
      >
        <signup-form :showModal="updateShowModal" />
      </div>
      <div
        v-if="dialogStore.dialog === 'login'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="dialogStore.dialog = ''"
      >
        <login-form :showModal="updateShowModal" />
      </div>
      <div
        v-if="$route.path === '/success'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <success-verified-email :showModal="updateShowModal" />
      </div>
      <div
        v-if="$route.path === '/sent-email'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <sent-email :showModal="updateShowModal" />
      </div>
      <div class="h-[60vh] w-full flex justify-center items-center">
        <div class="flex flex-col items-center space-y-6 w-[400px] lg:w-[800px]">
          <h1 class="text-[#DDCCAA] text-2xl lg:text-6xl text-center">
            {{ $t('find_quote') }}
          </h1>
          <Button type="button" text="get_started_btn" classes="bg-[#E31221]" />
        </div>
      </div>
    </div>
    <landing-image-card />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import SignupForm from './SignupForm.vue'
import LoginForm from './LoginForm.vue'
import SuccessVerifiedEmail from './SuccessVerifiedEmail.vue'
import Button from '../components/Button.vue'
import LandingImageCard from '../components/LandingImageCard.vue'
import { useControllDialogs } from '../stores/controlDialogs'
import SentEmail from './SentEmail.vue'

const dialogStore = useControllDialogs()

const updateShowModal = (value) => {
  dialogStore.dialog = value
}
</script>
