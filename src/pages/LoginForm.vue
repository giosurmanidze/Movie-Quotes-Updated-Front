<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[600px] rounded shadow-lg flex flex-col gap-2 xs:w-[95%] max-h-90vh overflow-auto bg-[#222030]"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center text-[#FFFFFF]">
        <h1 class="text-3xl">{{ $t('log_in_form_title') }}</h1>
        <span class="text-md text-[#6C757D] mt-1">{{ $t('log_in_form_header_text') }}</span>
      </div>
      <Form @submit="submit" v-slot="{ errors }">
        <div class="flex flex-col justify-between h-[40vh]">
          <text-field
            label="username"
            type="text"
            name="username"
            rules="required|min:3"
            :hasError="errors.username"
            :placeholder="
              $t('text_in_placeholder') +
              ' ' +
              $t('username').toLowerCase() +
              ' ' +
              $t('or') +
              ' ' +
              $t('email').toLowerCase()
            "
          />
          <text-field
            label="password"
            type="password"
            name="password"
            rules="required"
            :placeholder="$t('password')"
            :hasError="errors.password"
          />
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <Field id="remember" type="checkbox" name="remember" value="true" class="w-4 h-4" />
              <label for="remember" class="text-[#FFFFFF] text-base">{{ $t('remember_me') }}</label>
            </div>
            <p class="text-[#0D6EFD] underline">{{ $t('forgot_password') }}</p>
          </div>
          <submit-button text="log_in_btn" classes="bg-[#E31221]" />
          <submit-button
            text="log_in_with_google"
            classes="flex justify-center items-center gap-3 border-2 pb-1 border-[#ffffff]"
            :show-icon="true"
          />
        </div>
        <Loading v-if="loading" />
        {{ user }}
      </Form>
      <span class="text-center text-[#6C757D]"
        >{{ $t('log_in_footer_text')
        }}<router-link to="signup" class="text-[#0D6EFD] underline ml-1">{{
          $t('sign_up')
        }}</router-link></span
      >
    </div>
  </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import TextField from '@/components/TextField.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { loginUser } from '@/services/sendRequest'
import axiosInstance from '@/config/axios/index'
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref()
const loading = ref(false)
const router = useRouter()

const submit = async (values) => {
  loading.value = true
  await axiosInstance.get('/sanctum/csrf-cookie')

  try {
    await loginUser(values)
    const { data } = await axiosInstance.get('/api/user')
    user.value = data
    loading.value = false
    router.push({ name: 'newFeeds' })
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
</script>
