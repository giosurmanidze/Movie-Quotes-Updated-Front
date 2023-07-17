<template>
  <div class="text-white">
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
    <section class="mb-5">
      <LeftArrowIcon @click="$router.back()" />
    </section>
    <section class="bg-add_quote_btn -mx-7 h-[80vh] px-7 py-10">
      <section v-if="$route.name === 'userProfile'" class="flex justify-center">
        <img :src="userAvatar" class="h-32 mt-5 max-w-[8.75rem] rounded-full" />
      </section>
      <Form @submit="sendThumbnailData">
        <div v-if="$route.name === 'userProfile'" class="text-white px-7">
          <section class="text-center" @click="showSaveChangesButtons = true">
            <ProfileFileInput />
          </section>
          <section class="gird grid-cols-1 divide-y divide-gray-500">
            <section class="flex justify-between mt-7">
              <section class="flex flex-col">
                <p class="pb-2">{{ $t("username") }}</p>
                <p>{{ props.user.username }}</p>
              </section>
              <p
                class="cursor-pointer mt-7 text-quote_text"
                @click="editUsernameHandler()"
              >
                {{ $t("edit") }}
              </p>
            </section>
            <section class="flex justify-between mt-7">
              <section class="flex flex-col mt-5 pb-5">
                <p class="pb-2">{{ $t("email") }}</p>
                <p class="text-quote_text">{{ props.user.email }}</p>
              </section>
            </section>
            <section class="flex justify-between mt-4">
              <section class="flex flex-col mt-5 pb-5">
                <p class="pb-2">{{ $t("password") }}</p>
                <p class="text-quote_text">**********</p>
              </section>
            </section>
            <div></div>
            <section class="flex justify-between py-7" v-if="showSaveChangesButtons">
              <p class="text-quote_text cursor-pointer">
                {{ $t("cancel") }}
              </p>
              <button class="bg-red-600 p-2 rounded text-white" type="submit">
                {{ $t("save_changes") }}
              </button>
            </section>
          </section>
        </div>
      </Form>
      <ChangeUsername v-if="$route.name === 'changeName' || 'youSure'" />
      <YouSure v-if="$route.name === 'youSure'" />
    </section>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon.vue";
import { ref } from "vue";
import ProfileFileInput from "@/components/ProfileFIleInput.vue";
import AlertModal from "@/components/AlertModal.vue";
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";
import { useSendProfileAvatar } from "@/services";
import { useProfilePageStore } from "@/stores/profile/useProfilePageStore";
import ChangeUsername from "@/components/ChangeUsername.vue";
import { useRouter } from "vue-router";
import YouSure from "@/components/YouSure.vue";

const props = defineProps({ user: { type: Object, required: true } });

const { userAvatar } = storeToRefs(useUserStore());
const showSaveChangesButtons = ref(false);
const sendUserName = ref(false);
const { toggleShowForm } = useProfilePageStore();
const router = useRouter();

function editUsernameHandler() {
  toggleShowForm(false);
  router.push({ name: "changeName" });
  sendUserName.value = true;
}
const { toggleShowUsernameAlert, toggleShowAvatarAlert } = useProfilePageStore();
const profileStore = useProfilePageStore();

const { sendThumbnailData } = useSendProfileAvatar(showSaveChangesButtons);
</script>
