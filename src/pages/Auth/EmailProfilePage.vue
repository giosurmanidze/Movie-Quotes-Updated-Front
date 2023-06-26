<template>
  <div class="w-full -mx-7">
    <UserUpdatedAlert v-if="userUpdated" classes=" absolute" />
    <section class="mb-4 mt-1 pl-7">
      <LeftArrowIcon @click="goBackHandler()" />
    </section>
    <div class="bg-[#24222F] w-screen h-[80vh] px-7 py-10 text-white">
      <section class="mb-3">
        <SuccessfullEditModal
          v-if="
            profileStore.usernameEdited &&
            profiUserUpdatedAlertleStore.showSuccessfullEditModal
          "
          ><p class="text-[#0F5132] pl-3">
            {{ $t("username_changed_successfully") }}
          </p>
        </SuccessfullEditModal>
      </section>
      <section class="mb-3">
        <SuccessfullEditModal
          v-if="profileStore.passwordEdited && profileStore.showSuccessfullEditModal"
          ><p class="text-[#0F5132] pl-3">
            {{ $t("password_changed_successfully") }}
          </p>
        </SuccessfullEditModal>
      </section>
      <section v-if="profileStore.showForm" class="flex justify-center">
        <img
          :src="
            user.profile_picture
              ? user.profile_picture
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="h-[140px] max-w-[140px]"
        />
      </section>
      <Form>
        <div v-if="profileStore.showForm">
          <section class="text-center">
            <MobileFileInput />
          </section>
          <section class="mt-8 grid grid-cols-1 gap-2 divide-y divide-gray-500">
            <div class="flex flex-col">
              <p>{{ $t("username") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">{{ userName }}</p>
                <p @click="editUsernameHandler()" class="mt-2 text-[#CED4DA]">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="flex flex-col pt-5">
              <p>{{ $t("email") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">{{ user.email }}</p>
                <p @click="editEmailHandler()" class="mt-2 text-[#CED4DA]">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="pt-5">
              <p>{{ $t("password") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">*********</p>
                <p @click="editPasswordHandler()" class="mt-2 text-[#CED4DA]">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div></div>
          </section>
        </div>
      </Form>
      <ChangeUsername
        :email="user.email"
        v-if="!profileStore.showForm && showUsernameInput"
      />
      <ChangeEmail
        :email="user.email"
        :email_verified_at="user.email_verified_at"
        v-if="!profileStore.showForm && showEmailInput"
      />
      <ChangePassword
        :email="user.email"
        :username="user.username"
        v-if="!profileStore.showForm && showPasswordInput"
      />
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
import SuccessfullEditModal from "@/components/SuccessfullEditModal.vue";
import ChangeUsername from "@/components/ChangeUsername.vue";
import { useProfilePageStore } from "@/stores/useProfilePageStore";
import UserUpdatedAlert from "@/components/UserUpdatedAlert.vue";

const props = defineProps({ user: { type: Object, required: true } });

const userName = computed(() => {
  return props.user.username;
});

const showUsernameInput = ref(false);
const showEmailInput = ref(false);
const showPasswordInput = ref(false);

const profileStore = useProfilePageStore();
const { toggleShowForm } = useProfilePageStore();
const router = useRouter();

function editUsernameHandler() {
  toggleShowForm();
  showUsernameInput.value = true;
  showPasswordInput.value = false;
  showEmailInput.value = false;
}

function editPasswordHandler() {
  toggleShowForm();
  showUsernameInput.value = false;
  showPasswordInput.value = true;
  showEmailInput.value = false;
}

function editEmailHandler() {
  toggleShowForm();
  showPasswordInput.value = false;
  showUsernameInput.value = false;
  showEmailInput.value = true;
}

function goBackHandler() {
  if (
    showUsernameInput.value == false &&
    showPasswordInput.value == false &&
    profileStore.showForm == true
  ) {
    router.back();
  } else {
    toggleShowForm(true);
    showUsernameInput.value = false;
    showPasswordInput.value = false;
  }
}

const userUpdated = ref(false);
</script>
