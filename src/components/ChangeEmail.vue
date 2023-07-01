<template>
  <section v-if="!showConfirmModal">
    <section>
      <ProfileInput name="email" rules="required" label="email" />
      <p class="text-red-500" v-if="emailErrors">{{ emailErrors }}</p>
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
      <p @click="cancelHandler()" class="py-3">{{ $t("cancel") }}</p>
      <p class="bg-red-600 p-3 rounded">
        {{ $t("confirm") }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProfileInput from "./ProfileInput.vue";
import { useProfilePageStore } from "@/stores/useProfilePageStore";

const { setShowValue } = useProfilePageStore();

const props = defineProps({
  emailErrors: { type: String, required: false },
});
const showConfirmModal = ref(false);

function cancelHandler() {
  showConfirmModal.value = !showConfirmModal.value;
}
</script>
