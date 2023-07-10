<template>
  <div class="bg-[#181623] grid h-screen place-items-center text-white pb-20">
    <section class="flex flex-col items-center">
      <forbidden-page-icon />
      <h1 class="md:text-4xl text-2xl font-bold mt-10">
        {{ $t("forbidden_header_text") }}
      </h1>
      <p class="md:text-lg text-base py-4 text-center px-4">
        {{ $t("forbidden_footer_text") }}
      </p>
      <custom-button
        type="button"
        text="return_home"
        classes="bg-btn_color"
        :route="authStore.authenticated && 'newsFeed'"
      />
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import ForbiddenPageIcon from "@/assets/icons/ForbiddenPageIcon.vue";
import CustomButton from "@/components/CustomButton.vue";
const authStore = useAuthStore();
</script>
