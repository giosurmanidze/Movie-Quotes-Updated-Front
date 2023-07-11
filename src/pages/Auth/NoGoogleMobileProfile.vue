<template>
  <div class="w-full -mx-7">
    <alert-modal
      classes="right-12 top-16 absolute"
      v-if="showUserUpdatedAlert"
      top_locale_text="succesfully_updated"
      bottom_locale_text="congratulations_user_is_updated"
    />
    <alert-modal
      classes="right-12 top-16 absolute"
      v-if="ShowEmailSentAlert"
      top_locale_text="confirm_email"
      bottom_locale_text="please_verify_new_email"
    />
    <section class="mb-4 mt-1 pl-7">
      <LeftArrowIcon @click="goBackHandler()" />
    </section>
    <div class="bg-add_quote_btn w-screen h-[80vh] px-7 py-10 text-white">
      <section v-if="profileStore.showForm" class="flex justify-center">
        <img :src="userAvatar" class="h-[8.75rem] max-w-[8.75rem] rounded-full" />
      </section>
      <Form @submit="submit">
        <div v-if="profileStore.showForm">
          <section class="text-center" @click="showSaveChangesButtons = true">
            <MobileFileInput />
          </section>
          <section class="mt-8 grid grid-cols-1 gap-2 divide-y divide-gray-500">
            <div class="flex flex-col">
              <p>{{ $t("username") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">{{ userName }}</p>
                <p @click="editUsernameHandler()" class="mt-2 text-quote_text">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="flex flex-col pt-5">
              <p>{{ $t("email") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">{{ user.email }}</p>
                <p @click="editEmailHandler()" class="mt-2 text-quote_text">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="pt-5">
              <p>{{ $t("password") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">*********</p>
                <p @click="editPasswordHandler()" class="mt-2 text-quote_text">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div></div>
          </section>
        </div>
        <ChangeUsername
          v-if="!profileStore.showForm && sendUserName"
          :usernameErrors="usernameErrors"
        />
        <ChangeEmail
          v-if="!profileStore.showForm && sendEmail"
          :emailErrors="emailErrors"
        />
        <ChangePassword v-if="!profileStore.showForm && showEditPassword" />
        <section v-if="showSaveChangesButtons" class="flex justify-between mt-8">
          <button type="button" class="p-2 pr-8 cursor-pointer" @click="cancelHandler()">
            {{ $t("cancel") }}
          </button>
          <button class="bg-red-600 p-2 rounded" type="submit">
            {{ $t("save_changes") }}
          </button>
        </section>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import ChangeEmail from "@/components/ChangeEmail.vue";
import MobileFileInput from "@/components/MobileFileInput.vue";
import ChangeUsername from "@/components/ChangeUsername.vue";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import AlertModal from "@/components/AlertModal.vue";
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";
import { useUpdateUserData } from "@/services/index";

const props = defineProps({ user: { type: Object, required: true } });

const userName = computed(() => {
  return props.user.username;
});
const { userAvatar } = storeToRefs(useUserStore());
const inputs = ref(0);

const profileStore = useProfilePageStore();
const { toggleShowForm } = useProfilePageStore();
const router = useRouter();

function cancelHandler() {
  showSaveChangesButtons.value = false;
  inputs.value ? inputs.value-- : "";
}

function editUsernameHandler() {
  toggleShowForm();
  showEditPassword.value = false;
  sendUserName.value = true;
  sendEmail.value = false;
}

function editPasswordHandler() {
  toggleShowForm();
  sendUserName.value = false;
  showEditPassword.value = true;
  sendEmail.value = false;
}

function editEmailHandler() {
  toggleShowForm();
  showEditPassword.value = false;
  sendUserName.value = false;
  sendEmail.value = true;
}

function goBackHandler() {
  router.push({ name: "newsFeed" });
  sendUserName.value === false;
  showEditPassword.value === false;
  profileStore.showForm === false;
  sendUserName.value = false;
}

const showUserUpdatedAlert = ref(false);
const ShowEmailSentAlert = ref(false);
const disableInput = ref(false);
const showSaveChangesButtons = ref(false);
const usernameErrors = ref("");
const emailErrors = ref("");
const disableInputForEmail = ref(true);
const showEditPassword = ref(true);
const sendUserName = ref(false);
const sendEmail = ref(false);

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
  emailErrors
);
</script>
