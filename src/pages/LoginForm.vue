<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 sm:px-16 xs:px-10 max-w-[37.5rem] rounded shadow-lg flex flex-col gap-2 xs:w-[95%] max-h-90vh overflow-auto bg-main_bg_color"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center text-white">
        <h1 class="text-3xl">{{ $t("log_in_form_title") }}</h1>
        <span class="text-md text-genre_text mt-1">{{
          $t("log_in_form_header_text")
        }}</span>
      </div>
      <Form @submit="submit" v-slot="{ errors }">
        <div class="flex flex-col justify-between h-[40vh]">
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
              <label for="remember" class="text-white text-base">{{
                $t("remember_me")
              }}</label>
            </div>

            <router-link
              :to="{ name: 'forgotPassword' }"
              class="text-forgot_pass_text underline"
              >{{ $t("forgot_password") }}
            </router-link>
          </div>
          <submit-button text="log_in_btn" classes="bg-[#E31221]" />
          <a
            :href="`${BASE_URL}/api/auth/google/redirect`"
            class="text-white px-3 rounded lg:text-xl h-10 flex justify-center items-center gap-3 border-2 pb-1 border-white"
            ><img src="../assets/Google.svg" />
            {{ $t("sign_up_with_google") }}
          </a>
        </div>
        <Loading v-if="loading" />
      </Form>
      <span class="text-center text-genre_text"
        >{{ $t("log_in_footer_text")
        }}<router-link
          :to="{ name: 'signup' }"
          class="text-forgot_pass_text underline ml-1"
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
import Loading from "@/components/Loading.vue";
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
