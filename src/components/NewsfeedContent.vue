<template>
  <div class="px-4 md:ml-5 mt-10 text-white">
    <QuoteAddedModal />
    <div
      v-for="quote in resultQuery"
      :key="quote.id"
      class="p-3 mb-5 bg-modal_bg rounded-lg"
    >
      <section class="flex items-center">
        <img
          :src="
            user.profile_picture
              ? user.profile_picture
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="h-10 lg:h-[3.125rem] max-w-[3.75rem] rounded-full"
        />
        <p class="ml-5">{{ user.username }}</p>
      </section>
      <section class="my-5">
        <p class="break-all">
          "{{ quote?.quote[lang] }}" Movie - {{ quote?.movie[lang] }}. ({{ quote?.year }})
        </p>
      </section>
      <section>
        <img
          :src="backendUrl + quote.thumbnail"
          alt="quote img"
          class="xl:w-[55.625rem] xl:h-[31.25rem]"
        />
      </section>
      <section class="flex gap-4 py-4 border-b border-white">
        <p>{{ quote.comments ? quote.comments.length : 0 }}</p>
        <comment-icon />
        <p>{{ quote.likes ? quote.likes.length : 0 }}</p>
        <LikedQuote :quoteId="quote.id" />
      </section>
      <section class="py-4" v-for="comment in quote.comments" :key="comment.id">
        <div class="flex items-center">
          <img
            :src="comment.user?.profile_picture"
            class="h-10 lg:h-[3.125rem] max-w-[3.75rem] rounded-full"
          />
          <p class="ml-5">{{ comment.username }}</p>
        </div>
        <div class="lg:ml-[4.375rem] pb-4 mt-3 border-b border-white">
          <p>{{ comment.body }}</p>
        </div>
      </section>
      <section @click="getQuoteId(quote.id)">
        <Form class="flex items-center py-3 w-full" @submit="submit">
          <img
            :src="user.profile_picture"
            class="h-10 lg:h-[3.125rem] max-w-[3.75rem] rounded-full mr-5"
          />
          <CommentInput
            name="comment"
            classes="w-full py-2 px-3 rounded bg-comment_input_bg"
            :placeholder="$t('write_comment')"
          />
        </Form>
      </section>
    </div>
  </div>
</template>

<script setup>
import QuoteAddedModal from "./QuoteAddModal.vue";
import CommentIcon from "@/assets/icons/CommentIcon.vue";
import LikedQuote from "@/components/LikedQuote.vue";
import CommentInput from "./CommentInput.vue";
import { storeToRefs } from "pinia";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/useUserStore";
import { computed, ref } from "vue";
import { Form } from "vee-validate";
import { useCreateComment } from "@/services";

const { locale } = useI18n();

const { quotes } = storeToRefs(useQuotesStore());
const { user } = storeToRefs(useUserStore());

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const lang = computed(() => {
  return locale.value;
});
const quotesStore = useQuotesStore();

const resultQuery = computed(() => {
  if (quotesStore.searchQuery && quotesStore.searchQuery.startsWith("#")) {
    let cleanString = ref(quotesStore.searchQuery.slice(1));
    return quotes.value.filter((item) => {
      return cleanString.value
        .toLowerCase()
        .split(" ")
        .every((v) => item.quote[locale.value].toLowerCase().startsWith(v));
    });
  } else if (quotesStore.searchQuery && quotesStore.searchQuery.startsWith("@")) {
    let cleanString = ref(quotesStore.searchQuery.slice(1));

    return quotes.value.filter((item) => {
      return cleanString.value
        .toLowerCase()
        .split(" ")
        .every((v) => item.movie?.[locale.value].toLowerCase().startsWith(v));
    });
  } else {
    return quotes.value;
  }
});

const quoteId = ref(null);
function getQuoteId(value) {
  quoteId.value = value;
}

window.onscroll = function () {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    getQuotes();
  }
};
const { getQuotes } = useQuotesStore();
const { submit } = useCreateComment(quoteId);
</script>
