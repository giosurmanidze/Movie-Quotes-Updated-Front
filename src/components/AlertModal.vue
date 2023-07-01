<template>
  <div
    v-if="showAlert"
    class="bg-alert_bg_color p-3 text-alert_text_color z-10"
    :class="classes"
  >
    <section class="flex justify-between">
      <div class="flex">
        <TickProfileIcon />
        <p class="ml-4">{{ $t(top_locale_text) }}</p>
      </div>
      <div class="cursor-pointer">
        <CrossIcon @click="showAlert = false" />
      </div>
    </section>
    <section>
      <p class="my-4 ml-10">{{ $t(bottom_locale_text) }} !</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CrossIcon from "@/assets/icons/CrossIcon.vue";
import TickProfileIcon from "@/assets/icons/TickProfileIcon.vue";

defineProps({
  classes: { required: true, type: String },
  top_locale_text: {
    type: String,
  },
  bottom_locale_text: {
    type: String,
  },
});
const showAlert = ref(true);
</script>
