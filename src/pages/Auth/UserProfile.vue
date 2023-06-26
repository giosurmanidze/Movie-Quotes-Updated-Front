<template>
  <menu-layout>
    <div
      v-if="!isLoggedInWithGoogle"
      class="px-4 hidden sm:block md:pr-16 md:ml-10 text-white"
    >
      <div>{{ $t("my_profile") }}</div>
      <NoGoogleProfile :user="user" />
    </div>
    <div v-if="!isLoggedInWithGoogle" class="sm:hidden">
      <NoGoogleMobileProfile :user="user" />
    </div>
    <div v-if="isLoggedInWithGoogle" class="hidden sm:block">
      <GoogleProfile :user="user" />
    </div>
    <div v-if="isLoggedInWithGoogle" class="sm:hidden">
      <MobileGoogleProfile :user="user" />
    </div>
  </menu-layout>
</template>

<script setup>
import { computed } from "vue";
import MenuLayout from "@/components/MenuLayout.vue";
import NoGoogleProfile from "@/components/NoGoogleProfile.vue";
import GoogleProfile from "@/components/GoogleProfile.vue";
import NoGoogleMobileProfile from "./NoGoogleMobileProfile.vue";
import MobileGoogleProfile from "./MobileGoogleProfile.vue";

import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

const { getUser } = useUserStore();
getUser();

const { user } = storeToRefs(useUserStore());

const isLoggedInWithGoogle = computed(() => {
  return user.value.google_id ? true : false;
});
</script>
