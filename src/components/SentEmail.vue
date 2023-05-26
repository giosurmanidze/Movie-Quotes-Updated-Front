<template>
  <div
    class="modal-content py-8 sm:px-16 xs:px-10 rounded shadow-lg flex flex-col gap-2 xs:w-[95%] lg:w-[40%] max-h-90vh overflow-auto bg-[#222030]"
    @click.stop
  >
    <div class="flex flex-col justify-center items-center text-[#FFFFFF]">
      <img src="../assets/email-sent.svg" />
      <h1 class="text-3xl">Thank you!</h1>
      <p>Please check your email and follow the instructions to activate your account.</p>
      <Button
        text="Go to my email"
        classes="bg-[#E31221]"
        route="/login"
        @click="dialogStore.dialog = 'login'"
      />
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'
import { useControllDialogs } from '../stores/controlDialogs'

const dialogStore = useControllDialogs()
</script>
