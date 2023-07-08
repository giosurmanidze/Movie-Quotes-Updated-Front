<template>
  <button
    class="text-white px-3 rounded-[0.25rem] lg:text-xl h-10"
    type="button"
    :class="props.classes"
  >
    <router-link :to="route ? route : '/'" class="flex items-center gap-2 justify-center">
      {{ $t(text) }}
    </router-link>
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: false,
  },
  showIcon: {
    type: Boolean,
    required: false,
  },
  route: {
    type: String,
    required: false,
  },
});
</script>
