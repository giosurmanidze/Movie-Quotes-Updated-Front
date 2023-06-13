<template>
  <like-icon :class="likeable ? 'fill-white' : 'fill-red-500'" @click="handleQuoteLike()" />
</template>

<script setup>
import { ref } from 'vue'
import LikeIcon from '@/assets/icons/LikeIcon.vue'

const props = defineProps({ quoteId: { type: Number, required: true } })

const likeable = ref(null)
</script>
