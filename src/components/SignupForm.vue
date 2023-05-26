<template>
  <div
    class="modal-content py-8 sm:px-16 xs:px-10 rounded shadow-lg flex flex-col gap-4 w-[95%] max-h-90vh overflow-auto bg-[#222030]"
    @click.stop
  >
    <div class="flex flex-col justify-center items-center text-[#FFFFFF] gap-1">
      <h1 class="text-3xl">{{ $t('sign_up_form_title') }}</h1>
      <span class="text-md text-[#6C757D]">{{ $t('sign_up_form_header_text') }}</span>
    </div>
    <Form @submit="submit" v-slot="{ errors }">
      <div class="flex flex-col justify-between h-[55vh]">
        <TextField
          label="username"
          type="text"
          name="name"
          rules="required|min:3|max:15|lower_alpha_num"
          :placeholder="$t('min_max_and_lower_case', { min: 3, max: 15 })"
          :hasError="errors.name"
        />
        <TextField
          label="email"
          type="text"
          name="email"
          rules="required|email"
          :placeholder="$t('enter_email')"
          :hasError="errors.email"
        />
        <TextField
          label="password"
          type="password"
          name="password"
          rules="required|min:8|max:15|lower_alpha_num"
          :placeholder="$t('min_max_and_lower_case', { min: 8, max: 15 })"
          :hasError="errors.password"
        />
        <TextField
          label="conf_password"
          type="password"
          name="password_confirmation"
          rules="required|confirmed:@password"
          :placeholder="$t('conf_password')"
          :hasError="errors.password_confirmation"
        />
        <Button type="submit" text="sign_up_btn_in_form" classes="bg-[#E31221]" />
        <Button
          type="button"
          text="sign_up_with_google"
          classes="flex justify-center items-center gap-3 border-2 pb-1 border-[#ffffff]"
          :show-icon="true"
        />
      </div>
    </Form>
    <span class="text-center text-[#6C757D]"
      >{{ $t('sign_up_footer_text')
      }}<span @click="showModal('login')" class="text-[#0D6EFD] underline ml-1">
        {{ $t('log_in_btn') }}
      </span></span
    >
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import TextField from './TextField.vue'
import Button from './Button.vue'
import axios from 'axios'
import { defineProps } from 'vue'
import { useControllDialogs } from '../stores/controlDialogs'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  showModal: {
    type: Function,
    requird: false
  }
})
const { locale } = useI18n({ useScope: 'global' })
const dialogStore = useControllDialogs()

const submit = (values, actions) => {
  axios
    .post('register', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    })
    .then(() => {
      // dialogStore.dialog = 'success'
    })
    .catch((error) => {
      console.log(error.response)
      const errors = error.response.data.errors
      for (const key in errors) {
        if (key === 'name') {
          if (locale.value === 'en') {
            actions.setFieldError('name', 'name is already taken')
          } else if (locale.value === 'ka') {
            actions.setFieldError('name', 'ეს სახელი უკვე არსებობს')
          }
        }

        if (key === 'email') {
          if (locale.value === 'en') {
            actions.setFieldError('email', 'Email is already taken')
          } else if (locale.value === 'ka') {
            actions.setFieldError('email', 'ეს მეილი უკვე არსებობს')
          }
        }
      }
    })
}
</script>
