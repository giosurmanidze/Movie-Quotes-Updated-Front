<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[37.5rem] rounded shadow-lg xs:w-full xs:h-screen xs:pt-20 flex flex-col gap-4 sm:w-[95%] sm:max-h-[90vh] sm:h-full overflow-auto bg-main_bg_color"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center text-white gap-1">
        <h1 class="xs:text-2xl sm:text-3xl">{{ $t("sign_up_form_title") }}</h1>
        <span class="xs:text-[1rem] text-genre_text">{{
          $t("sign_up_form_header_text")
        }}</span>
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
            rules="required|confirmed:password"
            :placeholder="$t('conf_password')"
            :hasError="errors.password_confirmation"
          />
          <submit-button
            text="sign_up_btn_in_form"
            classes="bg-[#E31221] xs:text-[1rem] lg:text-base"
          />
          <a
            :href="`${BASE_URL}/api/auth/google/redirect`"
            class="text-white text-center px-3 rounded xs:text-[1rem] lg:text-base h-10 flex justify-center items-center gap-2 border-2 pb-1 border-white"
            ><google-icon />
            {{ $t("sign_up_with_google") }}
          </a>
        </div>
        <loading-icon v-if="registerLoading" />
      </Form>
      <span class="text-center text-genre_text xs:text-[1rem] xs:mt-3"
        >{{ $t("sign_up_footer_text")
        }}<router-link
          :to="{ name: 'login' }"
          class="text-forgot_pass_text underline ml-1"
        >
          {{ $t("log_in_btn") }}
        </router-link></span
      >
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import TextField from "@/components/TextField.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { RouterLink } from "vue-router";
import LoadingIcon from "@/assets/icons/LoadingIcon.vue";
import { useSubmitRegister } from "@/services/index";
import GoogleIcon from "@/assets/icons/GoogleIcon.vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const { submit, loading: registerLoading } = useSubmitRegister();
</script>
