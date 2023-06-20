<template>
  <crud-modal
    @click="store.toggleEditQuoteModal(false)"
    :showModal="store.showEditQuoteModal"
  >
    <template v-slot:header>
      <div
        class="cursor-pointer absolute left-3 grid grid-cols-2 divide-x items-center bg-transparent py-2 px-5 rounded"
      >
        <section
          class="flex"
          v-if="!successMessage && !quoteSuccessfullyDeleted"
          @click="deleteQuoteById"
        >
          <DeleteIcon />
          <p class="ml-4">{{ $t("delete_quote") }}</p>
        </section>
      </div>
      {{ $t("edit_quote") }}
      <div @click="store.toggleEditQuoteModal(false)" class="absolute right-10 top-7">
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <div
        class="bg-[#11101A] rounded-lg"
        v-if="!successMessage && !quoteSuccessfullyDeleted"
      >
        <section class="flex items-center">
          <img
            :src="user.profile_picture"
            class="h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
          />
          <p class="ml-5">{{ user.username }}</p>
        </section>
        <Form @submit="submit">
          <section class="my-5">
            <CrudInput lang="en" name="bodyEn" rules="required|en" :oldValue="quoteEn" />
            <CrudInput lang="ka" name="bodyKa" rules="required|geo" :oldValue="quoteKa" />
          </section>
          <section>
            <ImageFileInput :src="imagePath" />
          </section>
          <button class="w-full bg-red-600 my-5 py-2">
            {{ $t("save_changes") }}
          </button>
        </Form>
      </div>
      <section class="items-center text-center my-5" v-if="successMessage">
        <p class="text-green-600 mb-5">{{ $t("quote_edited_successfully") }} !</p>
        <button class="text-center bg-red-600 p-2" @click="goBack()">
          {{ $t("go_back") }}
        </button>
      </section>
      <section class="items-center text-center my-5" v-if="quoteSuccessfullyDeleted">
        <p class="text-green-600 mb-5">{{ $t("quote_deleted_successfully") }} !</p>
        <button class="text-center bg-red-600 p-2" @click="goBack()">
          {{ $t("go_back") }}
        </button>
      </section>
    </template>
  </crud-modal>
</template>

<script setup>
import { Form } from "vee-validate";
import CrudInput from "@/components/CrudInput.vue";
import ImageFileInput from "@/components/ImageFileInput.vue";
import CrudModal from "@/components/CrudModal.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useEditQuote } from "@/services";

const { user } = storeToRefs(useUserStore());

const store = useModalStore();

const { quote } = storeToRefs(useQuotesStore());

const quoteSuccessfullyDeleted = ref(null);

const quoteEn = computed(() => {
  return quote.value.quote?.en;
});

const quoteKa = computed(() => {
  return quote.value.quote?.ka;
});

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + quote.value.thumbnail;
});

const { submit, successMessage } = useEditQuote(quote);

function goBack() {
  successMessage.value = false;
  store.toggleEditQuoteModal(false);
}

const { deleteQuote } = useQuotesStore();

function deleteQuoteById() {
  const quoteId = ref(quote.value.id);
  deleteQuote(quoteId.value);
  quoteSuccessfullyDeleted.value = true;
}
</script>