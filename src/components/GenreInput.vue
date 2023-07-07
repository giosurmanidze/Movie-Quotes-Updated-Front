<template>
  <div class="relative mt-5">
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-2 border border-genre_text rounded mb-4 px-3 py-3"
      @click.stop=""
      @click="openDropdown = !openDropdown"
    >
      <p v-if="!categories?.length">{{ $t("category") }}</p>
      <p
        v-for="category in categories"
        v-else
        class="w-36 text-center bg-genre_text rounded flex justify-between items-center space-x-1 py-1 px-2"
      >
        <span class="text-xs text-center w-full">{{
          category.genre?.[$i18n.locale]
        }}</span>
        <p :height="true" @click.stop="" @click="removeCategory(category)">X</p>
      </p>
    </div>
    <div
      v-if="openDropdown"
      class="absolute w-full bg-black z-10 top-[100%] px-2 py-3"
      @click.stop=""
    >
      <p
        v-for="category in allCategories"
        class="hover:bg-gray-500 w-full px-1 py-2"
        @click.once="addCategory(category)"
      >
        {{ category.genre?.[$i18n.locale] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useMoviesStore} from '@/stores/useMoviesStore'
import { storeToRefs } from 'pinia';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  }
});

const openDropdown = ref(false);
const { allCategories } = storeToRefs(useMoviesStore())

const addCategory = (value) => {
  if (!props.categories.filter((category) => category.id === value.id).length) {
    props.categories.push(value);
    openDropdown.value = false;
  }
};

const removeCategory = (value) => {
  const index = props.categories.indexOf(value);
  props.categories.splice(index, 1);
};
</script>
