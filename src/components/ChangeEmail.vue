<template>
  <Form @submit="submitHandler">
    <section v-if="!showConfirmModal">
      <section>
        <ProfileInput name="email" rules="required" label="email" />
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      </section>
      <section class="flex justify-between pt-5">
        <div @click="profileStore.showForm = true" class="py-2 px-1">
          {{ $t("cancel") }}
        </div>
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
import { ref } from "vue";
import { Form } from "vee-validate";
import ProfileInput from "./ProfileInput.vue";
import axios from "@/config/axios";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });
const props = defineProps({
  email: { type: String, required: false },
});
const showConfirmModal = ref(false);
const errorMessage = ref(null);
const { getUser } = useUserStore();
const { toggleShowEmailAlert } = useProfilePageStore();
const profileStore = useProfilePageStore();

const changedEmail = ref(null);

function submitHandler(values) {
  showConfirmModal.value = !showConfirmModal.value;
  changedEmail.value = values.email;
}

function sendData() {
  axios
    .post("api/user/add-email", { email: changedEmail.value })
    .then(() => {
      toggleShowEmailAlert(true);
      profileStore.toggleShowForm(true);
      profileStore.toggleShowModal(true);
      errorMessage.value = "";
      getUser();
    })
    .catch((error) => {
      showConfirmModal.value = false;
      errorMessage.value = error.response.data.errors.email[0][locale.value];
    });
}
</script>
