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
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { sendEmail } from "@/services/index";

const showConfirmModal = ref(false);
const profileStore = useProfilePageStore();

const changedEmail = ref(null);

function submitHandler(values) {
  showConfirmModal.value = !showConfirmModal.value;
  changedEmail.value = values.email;
}
const { sendData, errorMessage } = sendEmail(changedEmail, showConfirmModal);
</script>
