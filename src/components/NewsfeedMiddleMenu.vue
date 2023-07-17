<template>
  <div class="flex">
    <section
      class="flex text-white md:pl-10 w-full"
      :class="isSearchBarVisible && 'xl:w-[30rem] md:w-[20rem]'"
    >
      <button
        class="flex md:bg-add_quote_btn p-2 rounded-md xs:justify-center w-full sm:justify-start"
      >
        <add-quote-modal />
        <div
          @click="store.toggleAddQuotesModal()"
          :class="`flex w-full xs:justify-center md:justify-start`"
        >
          <add-quote-icon />
          <p class="ml-2 text-base font-normal">{{ $t("write_new_quote") }}</p>
        </div>
      </button>
    </section>
    <section
      :class="`ml-5 text-input_text hidden md:block  ${isSearchBarVisible && 'w-full'}`"
    >
      <section
        class="flex p-2"
        :class="isSearchBarVisible && 'border-b border-input_text w-[95%]'"
      >
        <Form @submit="searchSubmit" class="flex mr-10 xs:hidden md:flex w-full">
          <button
            type="button"
            @click="toggleSearchBar"
            class="items-center gap-3 xs:hidden md:flex"
            :class="`${!isSearchBarVisible && 'xl:w-[10rem] lg:w-[15rem]'}`"
          >
            <find-icon class="mr-3" />
            <p v-if="!isSearchBarVisible" class="text-quote_text text-md">Search by</p>
          </button>
          <search-input
            :placeholder="placeholderText"
            name="search"
            v-if="isSearchBarVisible"
            :classes="`ml-2 text-base bg-transparent w-full outline-none pr-10`"
          />
        </Form>
      </section>
    </section>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import AddQuoteIcon from "@/assets/icons/AddQuote.vue";
import FindIcon from "@/assets/icons/SearchIcon.vue";
import AddQuoteModal from "@/components/AddQuoteModal.vue";
import SearchInput from "@/components/SearchInput.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { usePostStore } from "@/stores/posts/posts";

const { t } = useI18n({ useScope: "global" });

const store = useModalStore();
const storeSearch = usePostStore();
const isSearchBarVisible = ref(false);

function toggleSearchBar() {
  isSearchBarVisible.value = !isSearchBarVisible.value;
}
const placeholderText = computed(() => {
  return (
    t("enter_to_search") +
    " @ - " +
    t("enter_to_search_two") +
    " , " +
    " # - " +
    t("enter_to_search_three")
  );
});

function searchSubmit(values) {
  const quotesStore = usePostStore();
  quotesStore.searchValue = values.search;
  storeSearch.searchPosts();
}
</script>
