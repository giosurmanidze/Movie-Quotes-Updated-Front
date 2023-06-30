<template>
  <div class="text-white">
    <alert-modal
      classes="absolute right-6 left-6"
      v-if="showUserUpdated"
      top_locale_text="succesfully_updated"
      bottom_locale_text="congratulations_user_is_updated"
    />
    <section class="mb-5">
      <LeftArrowIcon @click="hideInputHandler()" />
    </section>
    <section class="bg-[#24222F] -mx-7 h-[80vh]">
      <section v-if="disableInput" class="flex justify-center">
        <img :src="userAvatar" class="h-[130px] mt-5 max-w-[140px] rounded-full" />
      </section>
      <Form @submit="sendThumbnailData">
        <div v-if="disableInput" class="text-white px-7">
          <section class="text-center" @click="showSaveChangesButtons = true">
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
            <div></div>
            <section class="flex justify-between py-7" v-if="showSaveChangesButtons">
              <p class="text-[#CED4DA] cursor-pointer">
                {{ $t("cancel") }}
              </p>
              <button class="bg-red-600 p-2 rounded text-white" type="submit">
                {{ $t("save_changes") }}
              </button>
            </section>
          </section>
        </div>
      </Form>
      <Form @submit="sendData">
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
            <button @click="sendData" type="submit" class="bg-red-600 p-3 rounded">
              {{ $t("confirm") }}
            </button>
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
import AlertModal from "@/components/AlertModal.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { useSendProfileAvatar } from "@/services";
import { useSendUsername } from "@/services";

const props = defineProps({ user: { type: Object, required: true } });

const router = useRouter();
const { userAvatar } = storeToRefs(useUserStore());
const disableInput = ref(true);
const showConfirmModal = ref(false);
const usernameError = ref(false);
const showUserUpdated = ref(false);
const showSaveChangesButtons = ref(false);

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
const { sendData } = useSendUsername(
  showUserUpdated,
  disableInput,
  showConfirmModal,
  usernameError
);
const { sendThumbnailData } = useSendProfileAvatar(
  showUserUpdated,
  showSaveChangesButtons
);
</script>
