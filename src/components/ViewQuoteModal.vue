<template>
  <crud-modal
    @click="store.toggleViewQuoteModal(false)"
    :showModal="store.showViewQuoteModal"
  >
    <template v-slot:header>
      <div
        class="absolute left-3 grid grid-cols-2 divide-x items-center bg-transparent py-2 px-5 rounded"
      >
        <section class="pr-5" @click="switchToEditQuoteModal()">
          <EditIcon />
        </section>
        <section class="pl-5" @click="deleteQuoteById()">
          <DeleteIcon />
        </section>
      </div>
      {{ $t("display_quote") }}
      <div @click="store.toggleViewQuoteModal(false)" class="absolute right-10 top-7">
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <div class="bg-[#11101A] rounded-lg">
        <section class="flex items-center">
          <img
            :src="user.profile_picture"
            class="h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
          />
          <p class="ml-5">{{ user.username }}</p>
        </section>
        <section class="my-5">
          <div
            class="w-full border mb-3 border-gray-600 p-2 rounded flex justify-between"
          >
            <p>"{{ quoteEn }}"</p>
            <p class="text-[#6C757D]">Eng</p>
          </div>
          <div class="w-full border border-gray-600 p-2 rounded flex justify-between">
            <p>"{{ quoteKa }}"</p>
            <p class="text-[#6C757D]">ქარ</p>
          </div>
        </section>
        <section>
          <img :src="imagePath" alt="quote img" class="w-full" />
        </section>
        <section class="flex gap-4 py-4 border-b border-[#EFEFEF]">
          <p>{{ quote.comments ? quote.comments.length : 0 }}</p>
          <comment-icon />
          <p>{{ quote.likes ? quote.likes.length : 0 }}</p>
          <LikedQuote :quoteId="quote.id" />
        </section>
        <section class="py-4" v-for="comment in quote.comments" :key="comment.id">
          <div class="flex items-center">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              class="h-[40px] lg:h-[50px] rounded-full"
            />
            <p class="ml-5">{{ comment.username }}</p>
          </div>
          <div class="lg:ml-[70px] pb-4 mt-3 border-b border-[#EFEFEF]">
            <p>{{ comment.body }}</p>
          </div>
        </section>
        <section @click="getQuoteId(quote.id)">
          <Form class="flex items-center py-3 w-full" @submit="submit">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              class="h-[40px] lg:h-[50px] rounded-full mr-5"
            />
            <CommentInput
              name="comment"
              classes="w-full py-2 px-3 rounded bg-[#24222F]"
              :placeholder="$t('write_comment')"
            />
          </Form>
        </section>
      </div>
    </template>
  </crud-modal>
</template>

<script setup>
import { Form } from "vee-validate";
import CrudModal from "@/components/CrudModal.vue";
import CommentInput from "@/components/CommentInput.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import CommentIcon from "@/assets/icons/CommentIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useCreateComment } from "@/services";
import LikedQuote from "@/components/LikedQuote.vue";

const { user } = storeToRefs(useUserStore());

const { quote } = storeToRefs(useQuotesStore());
const store = useModalStore();

const quoteEn = computed(() => {
  return quote.value.quote?.en;
});
``;

const quoteKa = computed(() => {
  return quote.value.quote?.ka;
});

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + quote.value.thumbnail;
});

function switchToEditQuoteModal() {
  store.toggleEditQuoteModal(true);
  store.toggleViewQuoteModal(false);
}

const { deleteQuote } = useQuotesStore();

function deleteQuoteById() {
  deleteQuote(quote.value.id);
  store.toggleViewQuoteModal();
  store.toggleQuoteDeletedModal();
}

const quoteId = ref(null);
function getQuoteId(value) {
  quoteId.value = value;
}

const { submit } = useCreateComment(quoteId);
console.log(quote);
</script>
