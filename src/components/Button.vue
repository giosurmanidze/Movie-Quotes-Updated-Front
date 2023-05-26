<template>
  <router-link
    to="signup"
    class="text-white px-3 rounded-[4px] lg:text-xl h-10"
    :type="type"
    :class="classes"
    @click="showModal"
  >
    <div v-if="showIcon"><google-svg /></div>
    {{ $t(text) }}
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import GoogleSvg from '../svg/GoogleSvg.vue'


const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    required: false
  },
  showModal: {
    type: Function,
    required: false
  },
  showIcon: {
    type: Boolean,
    required: false
  }
})
</script>
