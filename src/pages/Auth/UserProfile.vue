<template>
  <menu-layout>
    <div
      v-if="!isLoggedInWithGoogle"
      class="px-4 hidden sm:block md:pr-16 md:ml-10 text-white"
    >
      <div>{{ $t("my_profile") }}</div>
      <EmailProfile :user="user" />
    </div>
    <div v-if="!isLoggedInWithGoogle" class="sm:hidden">
      <EmailProfilePage :user="user" />
    </div>
  </menu-layout>
</template>

<script setup>
import { computed } from "vue";
import MenuLayout from "@/components/MenuLayout.vue";
import EmailProfile from "@/components/EmailProfile.vue";
import EmailProfilePage from "./EmailProfilePage.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

const { getUser } = useUserStore();
getUser();

const { user } = storeToRefs(useUserStore());

const isLoggedInWithGoogle = computed(() => {
  return user.value.google_id ? true : false;
});
</script>
