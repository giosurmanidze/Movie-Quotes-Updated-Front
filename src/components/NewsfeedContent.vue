<template>
  <div class="px-4 md:ml-5 mt-10 text-white">
    <QuoteAddedModal />
    <div v-for="quote in posts" :key="quote.id" class="p-3 mb-5 bg-modal_bg rounded-lg">
      <section class="flex items-center">
        <img
          :src="
            quote?.user?.profile_picture
              ? backendUrl + quote.user.profile_picture
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="xs:h-14 xs:w-[3.7rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
        />
        <p class="ml-5">{{ quote.user?.name }}</p>
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
        <LikedQuote :quoteId="quote.id" :quotes="posts" :user="user" />
      </section>

      <section
        class="py-4 w-full"
        v-for="comment in getVisibleComments(quote)"
        :key="comment.id"
      >
        <div class="flex items-center">
          <img
            :src="
              comment.user.profile_picture
                ? backendUrl + comment.user.profile_picture
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            class="xs:h-14 xs:w-[3.7rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
          />
          <p class="ml-5 font-semibold">{{ comment.user.name }}</p>
        </div>
        <div class="lg:ml-[4.375rem] pb-4 mt-3 border-b border-white">
          <p>{{ comment?.body }}</p>
        </div>
      </section>
      <button
        class="flex justify-center mx-auto my-4"
        v-if="shouldShowReadMoreButton(quote)"
        @click="toggleExpandComments(quote)"
      >
        {{ isExpanded(quote) ? $t("show_less") : $t("read_more") }}
      </button>
      <section @click="getQuoteId(quote.id)">
        <Form class="flex items-center py-3 w-full" @submit="submit">
          <img
            :src="userAvatar"
            class="xs:h-14 xs:w-[3.7rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem] mr-2"
          />
          <CommentInput
            name="comment"
            classes="w-full py-2 px-3 rounded bg-add_quote_btn"
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
import { usePostStore } from "@/stores/posts/posts";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user/useUserStore";
import { computed, ref, onMounted } from "vue";
import { Form } from "vee-validate";
import { useCreateComment } from "@/services";
import { useNotifications } from "@/stores/notifications/notifications";

const { user, userAvatar } = storeToRefs(useUserStore());
const { posts } = storeToRefs(usePostStore());
const { getPosts, handleScroll } = usePostStore();
const { getNotifications } = useNotifications();

console.log(posts);

onMounted(() => getPosts());
window.addEventListener("scroll", handleScroll);

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;
const { locale } = useI18n({ useScope: "global" });

const lang = computed(() => {
  return locale.value;
});

const quoteId = ref(null);
function getQuoteId(value) {
  quoteId.value = value;
}

const { submit } = useCreateComment(quoteId);

const expandedQuotes = ref([]);

function getVisibleComments(quote) {
  if (isExpanded(quote)) {
    return quote.comments;
  } else {
    return quote.comments.slice(0, 2);
  }
}

function shouldShowReadMoreButton(quote) {
  return quote.comments.length > 2;
}

function isExpanded(quote) {
  return expandedQuotes.value.includes(quote.id);
}

function toggleExpandComments(quote) {
  if (isExpanded(quote)) {
    expandedQuotes.value = expandedQuotes.value.filter((id) => id !== quote.id);
  } else {
    expandedQuotes.value.push(quote.id);
    expandedQuotes.value.push(quote.comments.map((comment) => comment.userId));
  }
}

onMounted(() => {
  getPosts();
});
window.Echo.channel("like-channel").listen(".new-like", () => {
  getPosts();
  getNotifications();
});
window.Echo.channel("comment-channel").listen(".new-comment", () => {
  getPosts();
  getNotifications();
});
</script>
