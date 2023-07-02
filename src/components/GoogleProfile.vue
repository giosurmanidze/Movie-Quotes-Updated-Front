<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-modal_bg">
    <alert-modal
      classes="absolute right-20 w-1/3"
      v-if="showUserUpdatedAlert"
      top_locale_text="succesfully_updated"
      bottom_locale_text="congratulations_user_is_updated"
    />
    <section class="flex justify-center text-white">
      <img
        :src="userAvatar"
        class="h-[3.75rem] md:h-20 lg:h-[8.75rem] max-w-[8.75rem] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submit">
      <div class="text-white">
        <section @click="showSaveChangesButtons = true" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-10 mt-16">
          <section class="flex w-full flex-col">
            <div class="flex w-full">
              <ProfileInput
                class="lg:w-1/2 w-full"
                name="username"
                rules="required"
                label="username"
                :currentUser="user.username"
                :disabled="disableInput"
              />
              <p
                v-if="disableInput"
                class="mt-9 ml-7 cursor-pointer"
                @click="inputToggleHandler()"
              >
                {{ $t("edit") }}
              </p>
            </div>
            <div v-if="usernameErrors">
              <p class="text-red-500">{{ usernameErrors }}</p>
            </div>
          </section>

          <section class="grid w-full border-y border-gray-600 py-10 grid-cols-1 gap-5">
            <div class="flex">
              <div class="lg:w-1/2 w-full h-12">
                <p class="bg-quote_text py-1.5 pl-1 rounded text-black">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </section>
          <div class="flex">
            <div class="lg:w-1/2 w-full h-12">
              <p class="bg-quote_text py-1.5 pl-1 rounded text-black">**********</p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <section v-if="showSaveChangesButtons" class="flex float-right mt-8 -mr-14">
        <p @click="hideChangeButtons()" class="p-2 pr-8 text-quote_text cursor-pointer">
          {{ $t("cancel") }}
        </p>
        <button class="bg-red-600 p-2 rounded text-white" type="submit">
          {{ $t("save_changes") }}
        </button>
      </section>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import ProfileFileInput from "./ProfileFIleInput.vue";
import ProfileInput from "./ProfileInput.vue";
import AlertModal from "./AlertModal.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { useUpdateUserData } from "@/services";

const props = defineProps({ user: { type: Object, required: true } });

const disableInput = ref(true);
const usernameErrors = ref(false);
const showUserUpdatedAlert = ref(false);
const sendUserName = ref(false);
const showSaveChangesButtons = ref(false);
const { userAvatar } = storeToRefs(useUserStore());

function inputToggleHandler() {
  disableInput.value = false;
  showSaveChangesButtons.value = true;
  if (!disableInput.value) {
    sendUserName.value = true;
  }
}
function hideChangeButtons() {
  disableInput.value = true;
  showSaveChangesButtons.value = false;
}
// const { submit, sendUserName } = useUpdateUserData(
//   showUserUpdatedAlert,
//   disableInput,
//   showSaveChangesButtons,
//   usernameErrors,
//   showEditPassword
// );
const { submit } = useUpdateUserData(
  showUserUpdatedAlert,
  undefined,
  disableInput,
  undefined,
  showSaveChangesButtons,
  usernameErrors,
  undefined,
  sendUserName,
  undefined,
  undefined
);
</script>
