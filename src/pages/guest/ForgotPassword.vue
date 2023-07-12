<template>
  <div
    class="fixed inset-0 flex xs:items-start sm:pt-28 justify-center sm:bg-black sm:bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[34.375rem] rounded sm:shadow-lg flex flex-col gap-2 pt-20 xs:w-full xs:h-screen sm:h-full sm:bg-main_bg_color xs:bg-message_modal_back_screen sm:max-h-[60vh] overflow-auto"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center gap-7 h-[40vh] w-full">
        <h1 class="xs:text-2xl sm:text-4xl text-white">
          {{ $t("forgot_password_header_title") }}
        </h1>
        <p class="text-center w-full text-md text-genre_text">
          {{ $t("forgot_password_header_text") }}
        </p>
        <Form class="w-full flex flex-col gap-5" @submit="submit" v-slot="{ errors }">
          <text-field
            name="email"
            label="email"
            type="text"
            rules="required|email"
            :placeholder="$t('enter_email')"
            :hasError="errors.email"
          />
          <submit-button
            text="forgot_password_submit_btn"
            classes="bg-btn_color w-full mt-2"
            route="/forgot-password-email-sent"
          />
          <loading-icon v-if="forgotLoading" />
        </Form>
        <router-link :to="{ name: 'login' }" class="flex gap-2 text-genre_text">
          <img src="@/assets/left-arrow.svg" />
          {{ $t("back_arrow") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { RouterLink } from "vue-router";
import TextField from "@/components/TextField.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import LoadingIcon from "@/assets/icons/LoadingIcon.vue";
import { useSubmitForgotPassword } from "@/services/index";

const { submit, loading: forgotLoading } = useSubmitForgotPassword();
</script>
