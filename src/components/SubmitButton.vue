<template>
  <button class="text-white px-3 rounded lg:text-xl h-10" type="submit" :class="classes">
    {{ $t(text) }}
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  classes: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
