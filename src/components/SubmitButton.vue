<template>
  <button class="text-white px-3 rounded-[4px] lg:text-xl h-10" type="submit" :class="classes">
    <div v-if="showIcon" class="mt-1"><img src="../assets/Google.svg" /></div>
    {{ $t(text) }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  classes: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
  showIcon: {
    type: Boolean,
    required: false
  }
})
</script>
