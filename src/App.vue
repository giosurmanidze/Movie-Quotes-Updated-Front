<template>
  <div :class="font">
    <newsfeed-navbar v-if="authStore.authenticated && $route.name !== 'landing'" />
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NewsfeedNavbar from "./components/NewsfeedNavbar.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const authStore = useAuthStore();
const { locale } = useI18n({ useScope: "global" });
const font = computed(() => {
  return locale.value === "en" ? "font-[HelveticaEnglish]" : "font-[HelveticaGeorgian]";
});
</script>

<style>
@font-face {
  font-family: "HelveticaGeorgian";
  src: local("HelveticaGeorgian"),
    url(@/assets/fonts/georgian/Helvetica-Bold.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaEnglish";
  src: local("HelveticaEnglish"),
    url(@/assets/fonts/english/Helvetica-english-Medium.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaGeorgianLight";
  src: local("HelveticaGeorgian"),
    url(@/assets/fonts/georgian/Helvetica-Light.ttf.ttf) format("truetype");
}
@font-face {
  font-family: "HelveticaEnglish";
  src: local("HelveticaEnglish"),
    url(@/assets/fonts/english/Helvetica-english-Medium.ttf) format("truetype");
}
</style>
