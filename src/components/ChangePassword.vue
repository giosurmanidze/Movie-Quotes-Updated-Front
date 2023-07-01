<template>
  <div>
    <div v-if="!showConfirmModal">
      <section class="bg-modal_bg px-4 py-3">
        <p>{{ $t("passwords_should_contain") }}:</p>
        <ul style="list-style-type: disc" class="px-4 py-3">
          <li class="text-sm">{{ $t("eight_or_more_characters") }}</li>
          <li class="text-sm">{{ $t("less_than_15_characters") }}</li>
        </ul>
      </section>
      <section class="text-black flex flex-col relative mt-4">
        <ProfileInput
          name="password"
          rules="required|alpha_num|min:8|max:15"
          type="password"
          label="password"
        />
        <br />
        <ProfileInput
          name="password_confirmation"
          type="password"
          rules="required|confirmed:password"
          label="conf_password"
        />
        <section class="flex justify-between text-white pt-5">
          <div @click="setShowValue(true)" class="py-2 px-1">{{ $t("cancel") }}</div>
          <button class="bg-red-600 rounded px-5 py-2">
            {{ $t("edit") }}
          </button>
        </section>
      </section>
    </div>
    <div v-if="showConfirmModal" class="grid grid-cols-1 divide-y divide-gray-500">
      <section class="text-center py-6">
        <p>{{ $t("sure_to_make_changes") }} ?</p>
      </section>
      <section class="pt-5 flex justify-between">
        <p @click="cancelHandler()" class="py-3">{{ $t("cancel") }}</p>
        <p @click="sendData()" class="bg-red-600 p-3 rounded">
          {{ $t("confirm") }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import ProfileInput from "./ProfileInput.vue";
import { useProfilePageStore } from "@/stores/useProfilePageStore";

const { setShowValue } = useProfilePageStore();

function cancelHandler() {
  showConfirmModal.value = !showConfirmModal.value;
}
</script>
