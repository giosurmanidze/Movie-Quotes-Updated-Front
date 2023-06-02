<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[550px] rounded shadow-lg flex flex-col gap-2 xs:w-[95%] max-h-90vh overflow-auto bg-[#222030]"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center gap-7 text-[#FFFFFF] h-[40vh] w-full">
        <h1 class="text-4xl">Forgot password?</h1>
        <p class="text-center w-full text-md text-[#6C757D]">
          Enter the email and we’ll send an email with instructions to reset your password
        </p>
        <Form class="w-full flex flex-col gap-5">
          <div v-for="n in num" class="w-full">
            <text-field name="resetEmail" label="Email" type="text" />
          </div>
          <submit-button text="Send instructions" classes="bg-[#E31221] w-full" :route="route" />
        </Form>
        <router-link to="login" class="flex gap-2 text-[#6C757D]">
          <img src="@/assets/left-arrow.svg" />
          Back to log in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { RouterLink } from 'vue-router'
import TextField from '../components/TextField.vue'
import SubmitButton from '@/components/SubmitButton.vue'
let num = 1
</script>
