<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-[#11101A]">
    <section class="flex justify-center">
      <UpdateUserAlert
        classes="absolute right-32 top-40 w-[400px]"
        v-if="showUserAlert"
      />
      <img class="h-[60px] md:h-[80px] lg:h-[140px] max-w-[140px] -mt-10 rounded-full" />
    </section>
    <Form>
      <div class="">
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
          <section class="grid w-full border-y border-gray-600 py-10 grid-cols-1 gap-5">
            <div class="flex">
              <ProfileInput
                class="lg:w-1/2 w-full"
                name="email"
                label="email"
                :disabled="true"
                rules="required"
                :verified="true"
                :currentUser="user.email"
              />
              <p class="mt-9 ml-7">{{ $t("edit") }}</p>
            </div>
            <section v-if="emailErrors">
              <p class="text-red-500">{{ emailErrors }}</p>
            </section>
          </section>
          <section class="flex w-full">
            <section class="flex w-full">
              <div class="lg:w-1/2 w-full h-[48px]">
                <p class="bg-[#CED4DA] py-1.5 pl-1 rounded text-black">**********</p>
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
              <p class="mt-4 text-[#9C9A9A]">* {{ $t("8_or_more_characters") }}</p>
              <p>* {{ $t("less_than_15_characters") }}</p>
            </div>
          </section>
          <section v-if="!showEditPassword">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="password"
              label="password"
              type="password"
              rules="alpha_num|min:8|lowercase"
            />
            <br />
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="confirm_password"
              label="conf_password"
              type="password"
              rules="alpha_num|min:8|confirmed:password|lowercase"
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
import UpdateUserAlert from "./UpdateUserAlert.vue";

defineProps({ user: { type: Object, required: true } });

const emailErrors = ref(null);
const usernameErrors = ref(null);
const showUserAlert = ref(false);

const inputs = ref(0);
const showSaveChangesButtons = ref(false);
const disableInput = ref(true);

function inputToggleHandler() {
  disableInput.value = false;
  showSaveChangesButtons.value = true;
}

const showEditPassword = ref(true);

function toggleEditPassword() {
  showEditPassword.value = false;
  showSaveChangesButtons.value = true;
}

function cancelHandler() {
  showSaveChangesButtons.value = false;
  inputs.value ? inputs.value-- : "";
}
</script>
