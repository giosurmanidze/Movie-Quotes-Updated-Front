<template>
  <div class="w-full -mx-7">
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
    <section class="mb-4 mt-1 pl-7">
      <LeftArrowIcon @click="$router.back()" />
    </section>
    <div class="bg-add_quote_btn w-screen h-[80vh] px-7 py-10 text-white">
      <section class="flex justify-center" v-if="$route.name === 'userProfile'">
        <img :src="userAvatar" class="h-[8.75rem] max-w-[8.75rem] rounded-full" />
      </section>
      <Form @submit="sendThumbnailData">
        <div v-if="$route.name === 'userProfile'">
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
        <ChangeUsername v-if="$route.name === 'changeName' || 'youSure'" />
        <ChangeEmail v-if="$route.name === 'changeEmail' || 'youSure'" />
        <ChangePassword
          :email="user.email"
          :username="user.username"
          v-if="$route.name === 'changePassowrd' || 'youSure'"
        />
        <YouSure v-if="$route.name === 'youSure'" />
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
import { useSendProfileAvatar } from "@/services/index";
import YouSure from "@/components/YouSure.vue";

const props = defineProps({ user: { type: Object, required: true } });
const {
  toggleShowUsernameAlert,
  toggleShowEmailAlert,
  toggleShowPassowrdAlert,
  toggleShowAvatarAlert,
} = useProfilePageStore();

const userName = computed(() => {
  return props.user.username;
});
const router = useRouter();

const { userAvatar } = storeToRefs(useUserStore());
const inputs = ref(0);

const profileStore = useProfilePageStore();
const { toggleShowForm } = useProfilePageStore();

function cancelHandler() {
  showSaveChangesButtons.value = false;
  inputs.value ? inputs.value-- : "";
}

function editUsernameHandler() {
  toggleShowForm(false);
  router.push({ name: "changeName" });
  sendUserName.value = true;
}
function editEmailHandler() {
  toggleShowForm(false);
  router.push({ name: "changeEmail" });
  sendEmail.value = true;
}
function editPasswordHandler() {
  toggleShowForm(false);
  router.push({ name: "changePassword" });
  showEditPassword.value = true;
}
const showSaveChangesButtons = ref(false);
const showEditPassword = ref(true);
const sendUserName = ref(false);
const sendEmail = ref(false);

const { sendThumbnailData } = useSendProfileAvatar(showSaveChangesButtons);
</script>
