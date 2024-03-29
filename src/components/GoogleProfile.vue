<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-modal_bg">
    <alert-modal
      classes="right-12 top-16 absolute"
      v-if="profileStore.showUsernameAlert"
      :alertUpdate="toggleShowUsernameAlert"
      top_locale_text="succesfully_updated"
      bottom_locale_text="congratulations_user_is_updated"
    />
    <alert-modal
      classes="right-12 top-16 absolute"
      v-if="profileStore.showAvatarAlert"
      :alertUpdate="toggleShowAvatarAlert"
      top_locale_text="succesfully_updated"
      bottom_locale_text="congratulations_user_avatar_updated"
    />
    <section class="flex justify-center text-white">
      <img
        :src="userAvatar"
        class="h-[3.75rem] md:h-20 lg:h-[8.75rem] max-w-[8.75rem] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submit">
      <div class="text-white">
        <section @click="sendAvatarData()" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-5 mt-16">
          <section class="flex w-full flex-col lg:ml-48 md:ml-17">
            <div class="flex w-full">
              <ProfileInput
                class="lg:w-1/2 w-full"
                name="username"
                rules="required"
                label="username"
                :currentUser="props.user.username"
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
          <section class="grid w-full py-10 grid-cols-1 gap-12 lg:ml-48 md:ml-17">
            <div class="flex">
              <div class="lg:w-1/2 w-full h-12">
                <p class="bg-quote_text py-1.5 pl-1 rounded text-black">
                  {{ props.user.email }}
                </p>
              </div>
            </div>
            <div class="flex">
              <div class="lg:w-1/2 w-full h-12">
                <p class="bg-quote_text py-1.5 pl-1 rounded text-black">**********</p>
              </div>
            </div>
          </section>
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
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";
import { useUpdateUserData } from "@/services";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";

const props = defineProps({ user: { type: Object, required: true } });

const { toggleShowUsernameAlert, toggleShowAvatarAlert } = useProfilePageStore();
const profileStore = useProfilePageStore();

const disableInput = ref(true);
const usernameErrors = ref(false);
const showUserUpdatedAlert = ref(false);
const sendUserName = ref(false);
const showSaveChangesButtons = ref(false);
const sendAvatar = ref(false);

const { userAvatar } = storeToRefs(useUserStore());

const sendAvatarData = () => {
  sendAvatar.value = true;
  showSaveChangesButtons.value = true;
};

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
  undefined,
  sendAvatar
);
</script>
