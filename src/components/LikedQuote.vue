<template>
  <LikeIcon
    :class="likeable ? 'fill-white' : 'fill-red-500'"
    @click="handleQuoteLikeWrapper"
  />
</template>

<script setup>
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import { ref, onMounted } from "vue";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { handleQuoteLike } from "@/services";
const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
  user: { type: Object, required: true },
});

const { getQuotesRefresh } = useQuotesStore();

const quotesStore = useQuotesStore();
const quotes = quotesStore.quotes;

const likeable = ref(false);
let likeId = ref(null);
const quote = ref(quotes?.find((quote) => quote.id === props.quoteId));

console.log(quote);
const getLikesData = () => {
  if (quote.value) {
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
  handleQuoteLike(props.quoteId, likeable, likeId);
}
</script>
