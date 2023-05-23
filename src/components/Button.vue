<template>
  <button class="text-white py-2 px-3 rounded-[4px] lg:text-xl" :class="classes">{{ $t(text) }}</button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    required: false
  }
})
</script>
