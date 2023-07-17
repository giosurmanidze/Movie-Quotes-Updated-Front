<template>
  <div class="grid grid-cols-1 divide-y divide-gray-500">
    <section class="text-center py-6">
      <p>{{ $t("sure_to_make_changes") }} ?</p>
    </section>
    <section class="pt-5 flex justify-between">
      <p @click="$router.push({ name: 'userProfile' })" class="py-3">
        {{ $t("cancel") }}
      </p>
      <p
        @click="newUsername || newPassowrd ? sendUserData() : sendData()"
        class="bg-red-600 p-3 rounded"
      >
        {{ $t("confirm") }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { userPassowrdUsernameUpdate, sendEmail } from "@/services/index";

const route = useRoute();
const newUsername = ref(route.query.username);
const newPassowrd = ref(route.query.passowrd);
const newEmail = ref(route.query.email);

const { toggleShowUsernameAlert } = useProfilePageStore();
const { sendUserData } = userPassowrdUsernameUpdate(
  newUsername.value ? "username" : "passowrd",
  newUsername.value ? newUsername : newPassowrd,
  toggleShowUsernameAlert
);

const { sendData } = sendEmail(newEmail);
</script>
