<template>
  <div>
    <newsfeed-navbar v-if="authStore.authenticated && $route.name !== 'landing'" />
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NewsfeedNavbar from "./components/NewsfeedNavbar.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
const authStore = useAuthStore();
</script>
