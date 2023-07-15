<template>
  <Form @submit="submitHandler">
    <section v-if="!showConfirmModal">
      <section>
        <ProfileInput name="username" rules="required" label="enter_new_username" />
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      </section>
      <section class="flex justify-between pt-5">
        <p @click="profileStore.showForm = true" class="py-2 px-1">{{ $t("cancel") }}</p>
        <button class="bg-red-600 rounded py-2 px-4">
          {{ $t("edit") }}
        </button>
      </section>
    </section>
    <div v-if="showConfirmModal" class="grid grid-cols-1 divide-y divide-gray-500">
      <section class="text-center py-6">
        <p>{{ $t("sure_to_make_changes") }} ?</p>
      </section>
      <section class="pt-5 flex justify-between">
        <p @click="showConfirmModal = false" class="py-3">{{ $t("cancel") }}</p>
        <p @click="sendData()" class="bg-red-600 p-3 rounded">
          {{ $t("confirm") }}
        </p>
      </section>
    </div>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import ProfileInput from "@/components/ProfileInput.vue";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { userPassowrdUsernameUpdate } from "@/services/index";

const showConfirmModal = ref(false);
const changedUsername = ref(null);

function submitHandler(values) {
  showConfirmModal.value = !showConfirmModal.value;
  changedUsername.value = values.username;
}
const { toggleShowUsernameAlert } = useProfilePageStore();
const profileStore = useProfilePageStore();

const { sendData, errorMessage } = userPassowrdUsernameUpdate(
  "username",
  changedUsername,
  toggleShowUsernameAlert,
  showConfirmModal
);
</script>
