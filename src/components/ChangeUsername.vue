<template>
  <Form @submit="submitHandler">
    <section v-if="$route.name === 'changeName'">
      <section>
        <ProfileInput name="username" rules="required" label="enter_new_username" />
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      </section>
      <section class="flex justify-between pt-5">
        <p @click="$router.push({ name: 'userProfile' })" class="py-2 px-1">
          {{ $t("cancel") }}
        </p>
        <button class="bg-red-600 rounded py-2 px-4">
          {{ $t("edit") }}
        </button>
      </section>
    </section>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import ProfileInput from "@/components/ProfileInput.vue";
import { useRouter } from "vue-router";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const { checkErrorMessage } = useProfilePageStore();
const { errorMessage } = storeToRefs(useProfilePageStore());

function submitHandler(values) {
  router.push({ name: "youSure", query: { username: values.username } });
  checkErrorMessage("");
}
</script>
