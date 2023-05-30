<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[600px] rounded shadow-lg flex flex-col gap-4 w-[95%] max-h-90vh overflow-auto bg-[#222030]"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center text-[#FFFFFF] gap-1">
        <h1 class="text-3xl">{{ $t('sign_up_form_title') }}</h1>
        <span class="text-md text-[#6C757D]">{{ $t('sign_up_form_header_text') }}</span>
      </div>
      <Form @submit="submit" v-slot="{ errors }">
        <div class="flex flex-col justify-between h-[55vh]">
          <text-field
            label="username"
            type="text"
            name="username"
            rules="required|min:3|max:15|lower_alpha_num"
            :placeholder="$t('min_max_and_lower_case', { min: 3, max: 15 })"
            :hasError="errors.username"
          />
          <text-field
            label="email"
            type="text"
            name="email"
            rules="required|email"
            :placeholder="$t('enter_email')"
            :hasError="errors.email"
          />
          <text-field
            label="password"
            type="password"
            name="password"
            rules="required|min:8|max:15|lower_alpha_num"
            :placeholder="$t('min_max_and_lower_case', { min: 8, max: 15 })"
            :hasError="errors.password"
          />
          <text-field
            label="conf_password"
            type="password"
            name="password_confirmation"
            rules="required|confirmed:@password"
            :placeholder="$t('conf_password')"
            :hasError="errors.password_confirmation"
          />
          <submit-button text="sign_up_btn_in_form" classes="bg-[#E31221]" />
          <submit-button
            text="sign_up_with_google"
            classes="flex justify-center items-center gap-3 border-2 pb-1 border-[#ffffff]"
            :show-icon="true"
          />
        </div>
        <Loading v-if="loading" />
      </Form>
      <span class="text-center text-[#6C757D]"
        >{{ $t('sign_up_footer_text')
        }}<router-link to="login" class="text-[#0D6EFD] underline ml-1">
          {{ $t('log_in_btn') }}
        </router-link></span
      >
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import TextField from '@/components/TextField.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, RouterLink } from 'vue-router'
import Loading from '@/components/Loading.vue'
import { createUser } from '@/services/createUser'
import axiosInstance from '@/config/axios'


const loading = ref(false)
const router = useRouter()
const { locale } = useI18n({ useScope: 'global' })

const submit = async (values, actions) => {
  loading.value = true
  await axiosInstance.get('/sanctum/csrf-cookie')

  try {
    await createUser(values)
    loading.value = false
    router.push({
      name: 'sentEmail'
    })
  } catch (error) {
    loading.value = false
    const errors = error.response?.data.errors
    for (const key in errors) {
      actions.setFieldError(key, errors[key][0][locale.value])
    }
  }
}
</script>
