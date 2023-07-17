<template>
  <div class="flex justify-center text-white z-10">
    <div class="md:relative z-30">
      <button @click="dropdownState = !dropdownState">
        <DotsIcon :dropdownState="dropdownState" />
      </button>
      <div
        v-if="dropdownState"
        class="origin-top-right px-10 pb-4 pt-2 absolute right-0 bg-add_quote_btn w-[15.5rem] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="flex-col mt-3">
          <div class="items-center flex cursor-pointer" @click="showViewQuotesModal()">
            <ViewIcon />
            <p class="ml-7">{{ $t("view_quote") }}</p>
          </div>
          <div
            class="items-center flex my-5 cursor-pointer"
            @click="showEditQuoteModal()"
          >
            <EditIcon />
            <p class="ml-7">{{ $t("edit_quote") }}</p>
          </div>
          <div class="items-center flex cursor-pointer" @click="deleteQuoteById()">
            <DeleteIcon />
            <p class="ml-7">{{ $t("delete_quote") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import DotsIcon from "@/assets/icons/DotsIcon.vue";
import ViewIcon from "@/assets/icons/ViewIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { useQuotesStore } from "@/stores/quotes/useQuotesStore.js";

const store = useModalStore();
const { quote } = storeToRefs(useQuotesStore());
const dropdownState = ref(false);

function showViewQuotesModal() {
  store.toggleViewQuoteModal();
  localStorage.setItem("quoteId", JSON.stringify(quote.value?.id));
  dropdownState.value = false;
}

function showEditQuoteModal() {
  store.toggleEditQuoteModal();
  dropdownState.value = false;
}

const { deleteQuote } = useQuotesStore();

function deleteQuoteById() {
  deleteQuote(quote.value.id);
  store.toggleQuoteDeletedModal();
}
</script>
