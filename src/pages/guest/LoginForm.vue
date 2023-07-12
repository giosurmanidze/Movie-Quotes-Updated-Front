<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[37.5rem] rounded shadow-lg flex flex-col gap-2 xs:w-full xs:h-screen xs:pt-28 sm:max-h-[70vh] sm:h-full overflow-auto bg-main_bg_color"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center text-white">
        <h1 class="xs:text-2xl sm:text-3xl">{{ $t("log_in_form_title") }}</h1>
        <span class="text-sm text-genre_text mt-1 text-center">{{
          $t("log_in_form_header_text")
        }}</span>
      </div>
      <Form @submit="submit" v-slot="{ errors }" class="xs:mt-5">
        <div class="flex flex-col justify-between lg:h-[35vh] xs:h-[40vh]">
          <text-field
            label="username"
            type="text"
            name="username"
            :updateInput="updateInput"
            :value="loginForm.username"
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
            :updateInput="updateInput"
            :value="loginForm.password"
            name="password"
            rules="required"
            :placeholder="$t('password')"
            :hasError="errors.password"
          />

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                @input="updateInput('remember', $event.target.value)"
                v-model="loginForm.remember"
                class="w-4 h-4"
              />
              <label for="remember" class="text-white xs:text-sm sm:text-md">{{
                $t("remember_me")
              }}</label>
            </div>

            <router-link
              :to="{ name: 'forgotPassword' }"
              class="text-forgot_pass_text underline xs:text-sm sm:text-md"
              >{{ $t("forgot_password") }}
            </router-link>
          </div>
          <submit-button text="log_in_btn" classes="bg-[#E31221] text-sm lg:text-base" />
          <a
            :href="`${BASE_URL}/api/auth/google/redirect`"
            class="text-white px-3 rounded text-sm lg:text-base h-10 flex justify-center items-center gap-3 border-2 pb-1 border-white"
          >
            <google-icon />
            {{ $t("log_in_with_google") }}
          </a>
        </div>
        <loading-icon v-if="loading" />
      </Form>
      <span class="text-center text-genre_text text-sm sm:text-base xs:mt-3"
        >{{ $t("log_in_footer_text")
        }}<router-link
          :to="{ name: 'signup' }"
          class="text-forgot_pass_text underline ml-1 text-sm sm:text-base"
          >{{ $t("sign_up") }}</router-link
        ></span
      >
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import TextField from "@/components/TextField.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { loginUser } from "@/services/requests/sendRequest";
import axiosInstance from "@/config/axios/index";
import LoadingIcon from "@/assets/icons/LoadingIcon.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const user = ref();
const loading = ref(false);
const router = useRouter();
const { t } = useI18n();
const BASE_URL = import.meta.env.VITE_BASE_URL;

let storedLoginForm = localStorage.getItem("remember_me");
let loginForm = storedLoginForm
  ? JSON.parse(storedLoginForm)
  : { remember: false, password: "", username: "" };

const updateInput = (key, value) => {
  loginForm[key] = value;
};

const submit = async (values, actions) => {
  loading.value = true;

  try {
    await loginUser(values);
    const { data } = await axiosInstance.get("/api/user");
    user.value = data;
    loading.value = false;
    router.push({ name: "newsFeed" });

    return loginForm.remember
      ? localStorage.setItem("remember_me", JSON.stringify(loginForm))
      : localStorage.removeItem("remember_me");
  } catch (error) {
    loading.value = false;
    actions.setFieldError("username", t("incorrect_credentials"));
  }
};

onMounted(() => {
  const storedLoginForm = localStorage.getItem("remember_me");
  if (storedLoginForm) {
    loginForm = JSON.parse(storedLoginForm);
  }
});
</script>
