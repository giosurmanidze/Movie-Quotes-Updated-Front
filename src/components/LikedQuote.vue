<template>
  <LikeIcon
    :class="likeable ? 'fill-white' : 'fill-red-500'"
    @click="handleQuoteLike()"
  />
</template>

<script setup>
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import { getLikesData, addLike } from "@/services";

const props = defineProps({
  quotes: { type: Object, required: false },
  quoteId: {
    type: Number,
    required: false,
  },
  user: { type: Object, required: false },
});
const { likeable } = getLikesData(props.quotes, props.quoteId, props.user);
const { handleQuoteLike } = addLike(likeable, props.quoteId);
</script>
