<template>
  <LikeIcon
    :class="`cursor-pointer ${likeable ? 'fill-white' : 'fill-red-500'}`"
    @click="handleQuoteLikeWrapper"
  />
</template>

<script setup>
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import { ref, onMounted } from "vue";
import { useQuotesStore } from "@/stores/quotes/useQuotesStore";
import { handleQuoteLike } from "@/services";

const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
  user: { type: Object, required: true },
  quotes: {
    type: Array,
  },
});

const { getQuotesRefresh } = useQuotesStore();

const likeable = ref(false);
let likeId = ref(null);
let isRequestInProgress = false;
const quote = ref(props.quotes?.find((quote) => quote.id === props.quoteId));

const getLikesData = () => {
  if (quote.value?.likes) {
    const like = quote.value.likes?.find((like) => like.user.id === props.user?.id);
    likeable.value = !like;
    getQuotesRefresh();
    if (like) {
      likeId.value = like.id;
    }
  }
};

onMounted(() => {
  getLikesData();
});

function handleQuoteLikeWrapper() {
  getQuotesRefresh();
  if (!isRequestInProgress) {
    isRequestInProgress = true;
    handleQuoteLike(props.quoteId, likeable, likeId).finally(() => {
      isRequestInProgress = false;
    });
  }
}
</script>
