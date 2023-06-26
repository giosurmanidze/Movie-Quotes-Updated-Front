<template>
  <div class="text-white">
    <UserUpdatedAlert classes="absolute right-6 left-6" />
    <section class="mb-5">
      <LeftArrowIcon @click="hideInputHandler()" />
    </section>
    <section class="bg-[#24222F] -mx-7">
      <section v-if="disableInput" class="flex justify-center">
        <img
          :src="
            user.profile_picture
              ? user.profile_picture
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="h-[130px] mt-5 max-w-[140px] rounded-full"
        />
      </section>
      <Form>
        <div v-if="disableInput" class="text-white px-7">
          <section class="text-center">
            <ProfileFileInput />
          </section>
          <section class="gird grid-cols-1 divide-y divide-gray-500">
            <section class="flex justify-between mt-7">
              <section class="flex flex-col">
                <p class="pb-2">{{ $t("username") }}</p>
                <p>{{ user.username }}</p>
              </section>
              <p class="cursor-pointer mt-7 text-[#CED4DA]" @click="disableInput = false">
                {{ $t("edit") }}
              </p>
            </section>
            <section class="flex justify-between mt-7">
              <section class="flex flex-col mt-5 pb-5">
                <p class="pb-2">{{ $t("email") }}</p>
                <p class="text-[#CED4DA]">{{ user.email }}</p>
              </section>
            </section>
            <section class="flex justify-between mt-4">
              <section class="flex flex-col mt-5 pb-5">
                <p class="pb-2">{{ $t("password") }}</p>
                <p class="text-[#CED4DA]">**********</p>
              </section>
            </section>
            <section class="flex justify-between py-7">
              <p class="text-[#CED4DA] cursor-pointer">
                {{ $t("cancel") }}
              </p>
              <button type="submit" class="bg-red-600 p-2 rounded text-white">
                {{ $t("save_changes") }}
              </button>
            </section>
          </section>
        </div>
      </Form>
      <Form @submit="submitForm">
        <section v-if="!disableInput && !showConfirmModal" class="mx-7 mt-5">
          <section class="pt-10">
            <ProfileInput name="username" rules="required" label="enter_new_username" />
            <p v-if="usernameError" class="mt-3 text-red-500">
              {{ usernameError }}
            </p>
          </section>
          <section class="py-5 flex justify-between">
            <p @click="hideInputHandler()" class="py-3">{{ $t("cancel") }}</p>
            <button class="bg-red-600 p-3 rounded">
              {{ $t("edit") }}
            </button>
          </section>
        </section>
        <div
          v-if="showConfirmModal"
          class="grid grid-cols-1 divide-y divide-gray-500 mx-7 py-5"
        >
          <section class="text-center py-6">
            <p>{{ $t("sure_to_make_changes") }} ?</p>
          </section>
          <section class="pt-5 flex justify-between">
            <p @click="backToInputHandler()" class="py-3">
              {{ $t("cancel") }}
            </p>
            <p type="submit" class="bg-red-600 p-3 rounded">
              {{ $t("confirm") }}
            </p>
          </section>
        </div>
      </Form>
    </section>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProfileFileInput from "@/components/ProfileFIleInput.vue";
import ProfileInput from "@/components/ProfileInput.vue";
import UserUpdatedAlert from "@/components/UserUpdatedAlert.vue";

const props = defineProps({ user: { type: Object, required: true } });

const router = useRouter();

const disableInput = ref(true);
const usernameError = ref(false);
const changedUsername = ref(null);
const showConfirmModal = ref(false);
const thumbnail = ref(null);

function hideInputHandler() {
  if (disableInput.value == true) {
    router.back();
  } else {
    disableInput.value = true;
  }
}

function backToInputHandler() {
  showConfirmModal.value = false;
  disableInput.value = false;
}

function submitForm(values) {
  changedUsername.value = values.username;
  showConfirmModal.value = true;
  thumbnail.value = values.thumbnail;
}
</script>
