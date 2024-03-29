<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-modal_bg">
    <section class="flex justify-center">
      <alert-modal
        classes="right-12 top-16 absolute"
        v-if="profileStore.showUsernameAlert"
        :alertUpdate="toggleShowUsernameAlert"
        top_locale_text="succesfully_updated"
        bottom_locale_text="congratulations_user_is_updated"
      />
      <alert-modal
        classes="right-12 top-16 absolute"
        v-if="profileStore.showEmailAlert"
        :alertUpdate="toggleShowEmailAlert"
        top_locale_text="confirm_email"
        bottom_locale_text="please_verify_new_email"
      />
      <alert-modal
        classes="right-12 top-16 absolute"
        v-if="profileStore.showPassowrdAlert"
        :alertUpdate="toggleShowPassowrdAlert"
        top_locale_text="succesfully_updated"
        bottom_locale_text="congratulations_user_password_updated"
      />
      <alert-modal
        classes="right-12 top-16 absolute"
        v-if="profileStore.showAvatarAlert"
        :alertUpdate="toggleShowAvatarAlert"
        top_locale_text="succesfully_updated"
        bottom_locale_text="congratulations_user_avatar_updated"
      />
      <img
        :src="userAvatar"
        class="h-[3.75rem] md:h-20 lg:h-[8.75rem] max-w-[8.75rem] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submit">
      <div>
        <section @click="sendAvatarData()" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-7 mt-16">
          <section class="flex w-full">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="username"
              label="username"
              rules="required|min:3|max:15|lower_alpha_num"
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
          <section class="flex w-full flex-col">
            <div class="flex w-full">
              <ProfileInput
                class="lg:w-1/2 w-full"
                name="email"
                label="email"
                :currentUser="user.email"
                :disabled="true"
              />
              <p
                v-if="disableInputForEmail"
                @click="inputToggleHandlerFromEmail()"
                class="mt-9 ml-7 cursor-pointer"
              >
                {{ $t("edit") }}
              </p>
            </div>
          </section>
          <div>
            <ProfileInput
              class="lg:w-1/2 w-full"
              v-if="!disableInputForEmail"
              name="new_email"
              label="new_email"
              rules="required|email"
            />
            <section v-if="emailErrors">
              <p class="text-red-500">{{ emailErrors }}</p>
            </section>
          </div>

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
          <section class="bg-modal_bg px-4 py-3" v-if="!showEditPassword">
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
          <section v-if="!showEditPassword">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="password"
              label="password"
              type="password"
              rules="required|lower_alpha_num|min:8|max:15|lowercase"
              @input="password = $event.target.value"
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
import { ref, watch } from "vue";
import ProfileFileInput from "./ProfileFIleInput.vue";
import ProfileInput from "./ProfileInput.vue";
import AlertModal from "./AlertModal.vue";
import { useUserStore } from "@/stores/user/useUserStore";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import { storeToRefs } from "pinia";
import { useUpdateUserData } from "@/services";

defineProps({ user: { type: Object, required: true } });
const {
  toggleShowUsernameAlert,
  toggleShowEmailAlert,
  toggleShowPassowrdAlert,
  toggleShowAvatarAlert,
} = useProfilePageStore();
const profileStore = useProfilePageStore();

const emailErrors = ref(null);
const usernameErrors = ref(null);
const inputs = ref(0);
const showSaveChangesButtons = ref(false);
const disableInput = ref(true);
const disableInputForEmail = ref(true);
const showEditPassword = ref(true);
const sendUserName = ref(false);
const sendEmail = ref(false);
const sendAvatar = ref(false);

const password = ref("");
const eightOrMoreCharacters = ref(false);
const lessThan15Characters = ref(false);

watch(password, (newValue) => {
  eightOrMoreCharacters.value = newValue.length >= 8;
  lessThan15Characters.value = newValue.length < 15 && newValue.length > 1;
});

const { userAvatar } = storeToRefs(useUserStore());

function inputToggleHandler() {
  disableInput.value = false;
  showSaveChangesButtons.value = true;
  sendUserName.value = true;
}
function inputToggleHandlerFromEmail() {
  disableInputForEmail.value = false;
  showSaveChangesButtons.value = true;
  if (!disableInputForEmail.value) {
    sendEmail.value = true;
  }
}
const sendAvatarData = () => {
  sendAvatar.value = true;
  showSaveChangesButtons.value = true;
};

function toggleEditPassword() {
  showEditPassword.value = false;
  showSaveChangesButtons.value = true;
}

function cancelHandler() {
  showSaveChangesButtons.value = false;
  emailErrors.value = "";
  showEditPassword.value = true;
  disableInputForEmail.value = true;
  inputs.value ? inputs.value-- : "";
}

const { submit } = useUpdateUserData(
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
