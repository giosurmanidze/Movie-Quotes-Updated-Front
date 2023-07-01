<template>
  <div
    class="bg-edit_modal_bg_color relative w-full py-3 items-center text-center rounded"
  >
    <section class="flex justify-between px-3">
      <section class="flex">
        <TickProfileIcon />
        <slot></slot>
      </section>
      <section class="text-center items-center">
        <CrossIcon @click="closeModalHandler()" />
      </section>
    </section>
  </div>
</template>

<script setup>
import TickProfileIcon from "@/assets/icons/TickProfileIcon.vue";
import CrossIcon from "@/assets/icons/CrossIcon.vue";

import { useProfilePageStore } from "@/stores/useProfilePageStore";

const profileStore = useProfilePageStore();

function closeModalHandler() {
  profileStore.toggleShowModal(false);
  profileStore.toggleUsernameEdited(false);
  profileStore.togglePasswordEdited(false);
}
</script>
