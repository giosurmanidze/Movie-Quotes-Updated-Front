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
          <a
            :href="`${BASE_URL}/api/auth/google/redirect`"
            class="text-white text-center px-3 rounded-[4px] lg:text-xl h-10 flex justify-center items-center gap-2 border-2 pb-1 border-[#ffffff]"
            ><img src="../assets/Google.svg" />
            {{ $t('sign_up_with_google') }}
          </a>
        </div>
        <Loading v-if="registerLoading" />
      </Form>
      <span class="text-center text-[#6C757D]"
        >{{ $t('sign_up_footer_text')
        }}<router-link :to="{ name: 'login' }" class="text-[#0D6EFD] underline ml-1">
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
import { RouterLink } from 'vue-router'
import Loading from '@/components/Loading.vue'
import { useSubmitRegister } from '../services/index'

const BASE_URL = import.meta.env.VITE_BASE_URL

const { submit, loading: registerLoading } = useSubmitRegister()
</script>
