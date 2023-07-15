<template>
  <div class="lg:block bg-banner_gradient">
    <div class="h-[80vh] bg-banner_gradient pt-8 px-8 lg:px-16">
      <Header />
      <div
        v-if="$route.name === 'signup'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <signup-form />
      </div>
      <div
        v-if="$route.name === 'login'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <login-form />
      </div>
      <div
        v-if="$route.name === 'success'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <success-verified-email />
      </div>
      <div
        v-if="$route.name === 'sentEmail'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <sent-email />
      </div>
      <div
        v-if="$route.name === 'forgotPassword'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <forgot-password />
      </div>
      <div
        v-if="$route.name === 'resetPassword'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <create-password />
      </div>
      <div
        v-if="$route.name === 'changedPassword'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <changed-password />
      </div>
      <div
        v-if="$route.name === 'recoverInstructions'"
        class="fixed inset-0 flex justify-center items-center blur-bg"
        @click="$router.push('/')"
      >
        <recover-instructions />
      </div>
      <div class="h-[60vh] w-full flex justify-center items-center">
        <div class="flex flex-col items-center space-y-6 w-[25rem] lg:w-[50rem]">
          <h1 class="text-text_color text-2xl lg:text-6xl text-center">
            {{ $t("find_quote") }}
          </h1>
          <custom-button
            type="button"
            text="get_started_btn"
            classes="bg-btn_color"
            route="signup"
          />
        </div>
      </div>
    </div>
    <landing-image-card
      img="https://i.postimg.cc/4dpWbhzk/landing-page.png"
      quote="quote_from_Interstellar"
      movie="movie_Interstellar"
      year="2014"
    />
    <landing-image-card
      img="https://i.postimg.cc/7Yj5BCxx/image-3.png"
      quote="quote_from_some_like_it_hot"
      movie="movie_some_like_it_hot"
      year="1959"
    />
    <landing-image-card
      img="https://i.postimg.cc/jqmqTGBc/image-2.png"
      quote="quote_from_lord_of_rings"
      movie="lord_of_rings"
      year="1977"
    />
  </div>
</template>

<script setup>
import Header from "@/components/AppHeader.vue";
import SignupForm from "./SignupForm.vue";
import LoginForm from "./LoginForm.vue";
import SuccessVerifiedEmail from "./SuccessVerifiedEmail.vue";
import CustomButton from "@/components/CustomButton.vue";
import LandingImageCard from "@/components/LandingImageCard.vue";
import SentEmail from "./SentEmail.vue";
import ForgotPassword from "./ForgotPassword.vue";
import CreatePassword from "./CreatePassword.vue";
import ChangedPassword from "./ChangedPassword.vue";
import RecoverInstructions from "./RecoverInstructions.vue";
</script>
