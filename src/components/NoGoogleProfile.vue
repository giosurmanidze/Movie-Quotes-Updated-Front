<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-modal_bg">
    <section class="flex justify-center">
      <alert-modal
        classes="absolute right-12 top-40 w-[25rem]"
        v-if="showUserUpdatedAlert"
        top_locale_text="succesfully_updated"
        bottom_locale_text="congratulations_user_is_updated"
      />
      <alert-modal
        classes="absolute right-12 top-40 w-[25rem]"
        v-if="ShowEmailSentAlert"
        top_locale_text="confirm_email"
        bottom_locale_text="please_verify_new_email"
      />
      <img
        :src="userAvatar"
        class="h-[3.75rem] md:h-20 lg:h-[8.75rem] max-w-[8.75rem] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submit">
      <div>
        <section @click="showSaveChangesButtons = true" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-10 mt-16">
          <section class="flex w-full">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="username"
              label="username"
              rules="required"
              :currentUser="user.username"
              :disabled="disableInput"
            />
            <p
              v-if="disableInput"
              @click="inputToggleHandler()"
              class="mt-9 ml-7 cursor-pointer"
            >
              {{ $t("edit") }}
            </p>
          </section>
          <section v-if="usernameErrors">
            <p class="text-red-500">{{ usernameErrors }}</p>
          </section>
          <section class="flex w-full">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="email"
              label="email"
              rules="required"
              :currentUser="user.email"
              :disabled="disableInputForEmail"
            />
            <p
              v-if="disableInputForEmail"
              @click="inputToggleHandlerFromEmail()"
              class="mt-9 ml-7 cursor-pointer"
            >
              {{ $t("edit") }}
            </p>
          </section>
          <section v-if="emailErrors">
            <p class="text-red-500">{{ emailErrors }}</p>
          </section>

          <section class="flex w-full">
            <section class="flex w-full">
              <div class="lg:w-1/2 w-full h-12">
                <p class="bg-quote_text py-1.5 pl-1 rounded text-black">**********</p>
              </div>
              <p
                v-if="showEditPassword"
                class="ml-7 mt-2 cursor-pointer"
                @click="toggleEditPassword()"
              >
                {{ $t("edit") }}
              </p>
            </section>
          </section>
          <section v-if="!showEditPassword" class="flex flex-col">
            <div class="border border-gray-500 w-1/2 p-5">
              <h2>{{ $t("passwords_should_contain") }} :</h2>
              <p class="mt-4 text-[#9C9A9A]">* {{ $t("eight_or_more_characters") }}</p>
              <p>* {{ $t("less_than_15_characters") }}</p>
            </div>
          </section>
          <section v-if="!showEditPassword">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="password"
              label="password"
              type="password"
              rules="required|lower_alpha_num|min:8|max:15|lowercase"
            />
            <br />
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="password_confirmation"
              label="conf_password"
              type="password"
              rules="confirmed:password"
            />
          </section>
        </div>
        <br />
      </div>
      <section v-if="showSaveChangesButtons" class="flex float-right mt-8 -mr-14">
        <p class="p-2 pr-8 cursor-pointer" @click="cancelHandler()">
          {{ $t("cancel") }}
        </p>
        <button class="bg-red-600 p-2 rounded" type="submit">
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

defineProps({ user: { type: Object, required: true } });

const emailErrors = ref(null);
const usernameErrors = ref(null);
const showUserUpdatedAlert = ref(false);
const ShowEmailSentAlert = ref(false);
const inputs = ref(0);
const showSaveChangesButtons = ref(false);
const disableInput = ref(true);
const disableInputForEmail = ref(true);
const showEditPassword = ref(true);
const sendUserName = ref(false);
const sendEmail = ref(false);
const sendAvatar = ref(false);

const { userAvatar } = storeToRefs(useUserStore());

function inputToggleHandler() {
  disableInput.value = false;
  showSaveChangesButtons.value = true;
  if (!disableInput.value) {
    sendUserName.value = true;
  }
}
function inputToggleHandlerFromEmail() {
  disableInputForEmail.value = false;
  showSaveChangesButtons.value = true;
  if (!disableInputForEmail.value) {
    sendEmail.value = true;
  }
}

function toggleEditPassword() {
  showEditPassword.value = false;
  showSaveChangesButtons.value = true;
}

function cancelHandler() {
  showSaveChangesButtons.value = false;
  showEditPassword.value = true;
  inputs.value ? inputs.value-- : "";
}

const { submit } = useUpdateUserData(
  showUserUpdatedAlert,
  ShowEmailSentAlert,
  disableInput,
  disableInputForEmail,
  showSaveChangesButtons,
  usernameErrors,
  showEditPassword,
  sendUserName,
  sendEmail,
  emailErrors,
  sendAvatar
);
</script>
