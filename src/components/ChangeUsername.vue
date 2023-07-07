<template>
  <section v-if="!showConfirmModal">
    <section>
      <ProfileInput name="username" rules="required" label="enter_new_username" />
      <p class="text-red-500" v-if="usernameErrors">{{ usernameErrors }}</p>
    </section>
    <section class="flex justify-between pt-5">
      <div @click="setShowValue(true)" class="py-2 px-1">{{ $t("cancel") }}</div>
      <button class="bg-red-600 rounded py-2 px-4">
        {{ $t("edit") }}
      </button>
    </section>
  </section>
  <div v-if="showConfirmModal" class="grid grid-cols-1 divide-y divide-gray-500">
    <section class="text-center py-6">
      <p>{{ $t("sure_to_make_changes") }} ?</p>
    </section>
    <section class="pt-5 flex justify-between">
      <button type="button" @click="cancelHandler()" class="py-3">
        {{ $t("cancel") }}
      </button>
      <button type="submit" class="bg-red-600 button-3 rounded">
        {{ $t("confirm") }}
      </button>
    </section>
  </div>
</template>

<!-- eslint-disable-next-line no-unused-vars -->
<script setup>
import { ref, defineProps } from "vue";
import ProfileInput from "./ProfileInput.vue";
import { useProfilePageStore } from "@/stores/useProfilePageStore";

const showConfirmModal = ref(false);
const { setShowValue } = useProfilePageStore();

const props = defineProps({
  usernameErrors: { type: String, required: false },
});
function cancelHandler() {
  showConfirmModal.value = !showConfirmModal.value;
}
</script>
