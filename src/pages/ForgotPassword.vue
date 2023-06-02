<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[550px] rounded shadow-lg flex flex-col gap-2 xs:w-[95%] max-h-90vh overflow-auto bg-[#222030]"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center gap-7 h-[40vh] w-full">
        <h1 class="text-4xl text-[#FFFFFF]">Forgot password?</h1>
        <p class="text-center w-full text-md text-[#6C757D]">
          Enter the email and we’ll send an email with instructions to reset your password
        </p>
        <Form class="w-full flex flex-col gap-5" @submit="submit" v-slot="{ errors }">
          <text-field
            name="email"
            label="Email"
            type="text"
            rules="required|email"
            :hasError="errors.email"
          />
          <submit-button
            text="Send instructions"
            classes="bg-[#E31221] w-full"
            route="/forgot-password-email-sent"
          />
          <Loading v-if="loading" />
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
import { RouterLink, useRouter } from 'vue-router'
import TextField from '@/components/TextField.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { sendForgotPassword } from '@/services/sendRequest'
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const loading = ref(false)
const { locale } = useI18n({ useScope: 'global' })

const submit = async (values, actions) => {
  loading.value = true

  try {
    await sendForgotPassword(values)
    loading.value = false
    router.push({
      name: 'recoverInstructions'
    })
  } catch (error) {
    loading.value = false
    actions.setFieldError('email', error.response.data.errors.email[0][locale.value])
  }
}
</script>
