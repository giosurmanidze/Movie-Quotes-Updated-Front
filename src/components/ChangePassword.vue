<template>
  <Form @submit="submitHandler">
    <div>
      <div v-if="!showConfirmModal">
        <section class="bg-modal_bg px-4 py-3">
          <p>{{ $t("passwords_should_contain") }}:</p>
          <ul class="px-4 py-3 list-disc">
            <li
              :class="{
                'text-white': eightOrMoreCharacters,
                'text-genre_text': !eightOrMoreCharacters,
              }"
              class="text-sm"
            >
              {{ $t("eight_or_more_characters") }}
            </li>
            <li
              :class="{
                'text-white': lessThan15Characters,
                'text-genre_text': !lessThan15Characters,
              }"
              class="text-sm"
            >
              {{ $t("less_than_15_characters") }}
            </li>
          </ul>
        </section>
        <section class="text-black flex flex-col relative mt-4">
          <ProfileInput
            name="password"
            rules="required|alpha_num|min:8|max:15"
            type="password"
            label="password"
            @input="password = $event.target.value"
          />
          <br />
          <ProfileInput
            name="password_confirmation"
            type="password"
            rules="required|confirmed:password"
            label="conf_password"
          />
          <section class="flex justify-between text-white pt-5">
            <div @click="profileStore.showForm = true" class="py-2 px-1">
              {{ $t("cancel") }}
            </div>
            <button class="bg-red-600 rounded px-5 py-2">
              {{ $t("edit") }}
            </button>
          </section>
        </section>
      </div>
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
    </div>
  </Form>
</template>

<script setup>
import ProfileInput from "./ProfileInput.vue";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { ref, watch } from "vue";
import axios from "@/config/axios/index";
import { Form } from "vee-validate";

const showConfirmModal = ref(false);

const password = ref("");
const eightOrMoreCharacters = ref(false);
const lessThan15Characters = ref(false);

watch(password, (newValue) => {
  eightOrMoreCharacters.value = newValue.length >= 8;
  lessThan15Characters.value = newValue.length < 15 && newValue.length > 1;
});

const changedPassowrd = ref(null);
const { toggleShowPassowrdAlert } = useProfilePageStore();
const profileStore = useProfilePageStore();
function submitHandler(values) {
  showConfirmModal.value = !showConfirmModal.value;
  changedPassowrd.value = values.username;
}
const { getUser } = useUserStore();

function sendData() {
  axios
    .post("api/user/update", { password: changedPassowrd.value })
    .then(() => {
      profileStore.toggleShowForm(true);
      profileStore.toggleShowModal(true);
      profileStore.toggleUsernameEdited(true);
      toggleShowPassowrdAlert(true);
      getUser();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
