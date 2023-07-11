<template>
  <Field :name="name" :rules="rules" v-slot="{ field }" class="flex">
    <div class="flex w-full">
      <input
        v-bind="field"
        :placeholder="placeholder"
        :type="type"
        :class="classes"
        :value="searchQuery"
        @input="updateSearchQuery($event.target.value)"
      />
    </div>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { usePostStore } from "@/stores/posts/posts";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";

defineProps({
  name: { type: String, required: true },
  rules: {
    type: String,
    required: false,
  },
  type: { type: String, required: false },
  placeholder: { type: String, required: false },
  classes: { type: String, required: false },
});

const router = useRouter();
const route = useRoute();
const searchStoreQuote = usePostStore();
const searchStoreMovie = useMoviesStore();

const searchQuery = ref("");

if (route.query.search) {
  searchQuery.value = route.query.search;
  searchStoreQuote.searchValue = searchQuery.value;
  searchStoreMovie.searchValue = searchQuery.value;
}

const updateSearchQuery = (value) => {
  searchQuery.value = value;
  updateRouteQuery();
};

const updateRouteQuery = () => {
  const query = { ...route.query };
  query.search = searchQuery.value;

  router.push({ query });
};

watch(searchQuery, () => {
  updateRouteQuery();
});
</script>
