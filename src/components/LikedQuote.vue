<template>
  <LikeIcon
    :class="likeable ? 'fill-white' : 'fill-red-500'"
    @click="handleQuoteLike()"
  />
</template>

<script setup>
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { getLikesData, addLike } from "@/services";

const props = defineProps({ quoteId: { type: Number, required: true } });
const { getLikes, likeable } = getLikesData(props.quoteId);
getLikes();
const { handleQuoteLike } = addLike(likeable, props.quoteId);
</script>
