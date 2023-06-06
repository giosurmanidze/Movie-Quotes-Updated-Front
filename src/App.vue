<template>
  <div>
    <!-- v-if="authStore.authenticated" -->
    <newsfeed-navbar />
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NewsfeedNavbar from './components/NewsfeedNavbar.vue';
</script>
