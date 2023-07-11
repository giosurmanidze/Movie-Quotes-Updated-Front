<template>
  <div class="relative mt-5">
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-2 border border-genre_text rounded mb-4 px-3 py-3"
      @click.stop=""
      @click="openDropdown = !openDropdown"
    >
      <p v-if="!categories?.length" class="text-gray-300">{{ $t("category") }}</p>
      <div
        v-else
        v-for="category in categories"
        :key="category.id"
        class="w-36 text-center bg-genre_text rounded flex justify-between items-center space-x-1 py-1 px-2"
      >
        <span class="text-xs text-center w-full">{{
          category.genre?.[$i18n.locale]
        }}</span>
        <p @click.stop="" @click="removeCategory(category)">x</p>
      </div>
    </div>
    <div
      v-if="openDropdown"
      class="absolute w-full bg-black z-10 top-[100%] px-2 py-3"
      @click.stop=""
    >
      <p
        v-for="category in allCategories"
        :key="category.id"
        class="hover:bg-gray-500 w-full px-1 py-2"
        @click.once="addCategory(category)"
      >
        {{ category.genre?.[$i18n.locale] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps } from "vue";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";
import { storeToRefs } from "pinia";

const { allCategories } = storeToRefs(useMoviesStore());

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
const openDropdown = ref(false);
const modifiedCategories = ref([]);

const addCategory = (value) => {
  if (!modifiedCategories.value.find((category) => category.id === value.id)) {
    modifiedCategories.value.push(value);
    openDropdown.value = false;
  }
};

const removeCategory = (value) => {
  const index = modifiedCategories.value.findIndex(
    (category) => category.id === value.id
  );
  if (index !== -1) {
    modifiedCategories.value.splice(index, 1);
  }
};

watchEffect(() => {
  modifiedCategories.value = props.categories;
});
</script>
