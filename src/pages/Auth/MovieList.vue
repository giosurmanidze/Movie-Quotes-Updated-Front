<template>
  <menu-layout>
    <div class="px-4 md:pr-16 md:ml-10 text-white">
      <AddMoviesModal />
      <MovieAddedModal />
      <div class="flex justify-between items-center">
        <section class="flex">
          {{ $t("my_movies_list") }} ({{ $t("total") }} {{ moviesTotal }})
        </section>
        <section>
          <div class="flex items-center justify-between md:justify-end">
            <Form @submit="submitSearch" class="flex mr-10">
              <FindIcon class="mr-2 hidden md:block" />
              <SearchInput
                :placeholder="$t('search')"
                name="search"
                classes="bg-transparent px-2 w-[9.5rem] hidden md:block"
              />
            </Form>

            <button
              @click="store.toggleAddMoviesModal()"
              class="text-white bg-red-600 px-3 rounded-[0.25rem] lg:text-xl h-10"
            >
              {{ $t("add_movie") }}
            </button>
          </div>
        </section>
      </div>
      <section class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MovieCard
          v-for="movie in resultQuery"
          :key="movie.id"
          :id="movie.id"
          :name="movie.name"
          :numberOfQuotes="movie.quotes?.length"
          :thumbnail="movie.thumbnail"
          :releaseDate="movie.release_date"
        />
      </section>
    </div>
  </menu-layout>
</template>

<script setup>
import { Form } from "vee-validate";
import SearchInput from "@/components/SearchInput.vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import FindIcon from "@/assets/icons/SearchIcon.vue";
import MovieCard from "@/components/MovieCard.vue";
import AddMoviesModal from "@/components/AddMovieModal.vue";
import MovieAddedModal from "@/components/MovieAddedModal.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import MenuLayout from "@/components/MenuLayout.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/useUserStore";

const { getUser } = useUserStore();
getUser();

const { locale } = useI18n();
const store = useModalStore();

const { getMovies } = useMoviesStore();
getMovies();

const { movies } = storeToRefs(useMoviesStore());

const searchValue = ref(null);

function submitSearch(values) {
  searchValue.value = values.search;
}

const resultQuery = computed(() => {
  if (searchValue.value) {
    return movies.value.filter((item) => {
      return searchValue.value
        .toLowerCase()
        .split(" ")
        .every((v) => item.name[locale.value].toLowerCase().includes(v));
    });
  } else {
    return movies.value;
  }
});
const moviesTotal = computed(() => {
  return resultQuery.value.length;
});
</script>
