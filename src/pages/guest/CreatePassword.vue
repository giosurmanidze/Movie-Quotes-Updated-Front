<template>
  <div
    class="fixed inset-0 flex xs:items-start sm:pt-28 justify-center sm:bg-black sm:bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[34.375rem] rounded shadow-lg flex flex-col gap-2 max-h-90vh overflow-auto pt-20 xs:w-full xs:h-screen sm:h-full sm:bg-main_bg_color xs:bg-message_modal_back_screen sm:max-h-[60vh]"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center gap-7 h-[50vh] w-full">
        <h1 class="text-4xl text-white text-center">
          {{ $t("reset_password_header_title") }}
        </h1>
        <p class="text-center w-full text-md text-genre_text">
          {{ $t("reset_password_header_text") }}
        </p>
        <Form class="w-full flex flex-col gap-5" @submit="submit">
          <text-field
            label="password"
            type="password"
            name="password"
            rules="required|min:8|max:15|lower_alpha_num"
            :placeholder="$t('min_max_and_lower_case', { min: 8, max: 15 })"
          />
          <text-field
            label="conf_password"
            type="password"
            name="password_confirmation"
            rules="required|confirmed:password"
            :placeholder="$t('conf_password')"
          />
          <submit-button
            text="reset_password_submit_btn"
            classes="bg-[#E31221] w-full"
            route="/login"
          />

          <loading-icon v-if="createPasswordLoading" />
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
import SubmitButton from "@/components/SubmitButton.vue";
import TextField from "@/components/TextField.vue";
import LoadingIcon from "@/assets/icons/LoadingIcon.vue";
import { useSubmitCreatePassword } from "@/services/index";

const { submit, loading: createPasswordLoading } = useSubmitCreatePassword();
</script>
