<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-[#11101A]">
    <UserUpdatedAlert classes="absolute right-20 w-1/3" v-if="showUserUpdatedAlert" />
    <section class="flex justify-center text-white">
      <img
        :src="
          user.profile_picture
            ? user.profile_picture
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        "
        class="h-[60px] md:h-[80px] lg:h-[140px] max-w-[140px] -mt-10 rounded-full"
      />
    </section>
    <Form>
      <div class="text-white">
        <section @click="showSaveChangesButtons = true" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-10 mt-16">
          <section class="flex w-full">
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
          </section>
          <section v-if="usernameErrors">
            <p class="text-red-500">{{ usernameErrors }}</p>
          </section>
          <section class="grid w-full border-y border-gray-600 py-10 grid-cols-1 gap-5">
            <div class="flex">
              <div class="lg:w-1/2 w-full h-[48px]">
                <p class="bg-[#CED4DA] py-1.5 pl-1 rounded text-black">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </section>
          <div class="flex">
            <div class="lg:w-1/2 w-full h-[48px]">
              <p class="bg-[#CED4DA] py-1.5 pl-1 rounded text-black">**********</p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <section v-if="showSaveChangesButtons" class="flex float-right mt-8 -mr-14">
        <p @click="hideChangeButtons()" class="p-2 pr-8 text-[#CED4DA] cursor-pointer">
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
import UserUpdatedAlert from "./UserUpdatedAlert.vue";

defineProps({ user: { type: Object, required: true } });

const disableInput = ref(true);
const usernameErrors = ref(false);
const showUserUpdatedAlert = ref(false);
const showSaveChangesButtons = ref(false);

function inputToggleHandler() {
  disableInput.value = disableInput.value = false;
  showSaveChangesButtons.value = true;
}

function hideChangeButtons() {
  disableInput.value = true;
  showSaveChangesButtons.value = false;
}
</script>