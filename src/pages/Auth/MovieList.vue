<template>
  <menu-layout>
    <div class="px-4 md:pr-16 md:ml-10 text-white">
      <AddMovieModal />
      <MovieAddedModal />
      <div class="flex justify-between items-center">
        <section class="flex">
          {{ $t("my_movies_list") }} ({{ $t("total") }} {{ moviesTotal }})
        </section>
        <section>
          <div class="flex items-center justify-between md:justify-end">
            <button @click="toggleSearchBar" class="items-center gap-3 xs:hidden md:flex">
              <FindIcon class="mr-3" />
              <p v-if="!isSearchBarVisible" class="text-quote_text">Search</p>
            </button>
            <Form
              @submit="submitSearch"
              class="flex mr-10 xs:hidden md:flex"
              :class="{ hidden: !isSearchBarVisible }"
            >
              <div
                :class="{
                  hidden: !isSearchBarVisible,
                  'animate-fade-in': isSearchBarVisible,
                }"
              >
                <SearchInput
                  :placeholder="$t('search')"
                  name="search"
                  classes="bg-transparent px-2 w-[11.5rem]"
                  v-model="searchValue"
                />
              </div>
            </Form>
            <button
              @click="store.toggleAddMoviesModal()"
              class="text-white bg-red-600 px-3 rounded-[0.25rem] xs:text-sm lg:text-xl h-10 flex items-center gap-2"
            >
              <add-movie-plus-icon />
              {{ $t("add_movie") }}
            </button>
          </div>
        </section>
      </div>
      <section class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MovieCard
          v-for="movie in filteredMovies"
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
import { computed, ref, onMounted } from "vue";
import AddMoviePlusIcon from "@/assets/icons/AddMoviePlusIcon.vue";
import FindIcon from "@/assets/icons/SearchIcon.vue";
import MovieCard from "@/components/MovieCard.vue";
import AddMovieModal from "@/components/AddMovieModal.vue";
import MovieAddedModal from "@/components/MovieAddedModal.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { useMoviesStore } from "@/stores/movies/useMoviesStore.js";
import MenuLayout from "@/components/MenuLayout.vue";
import { useUserStore } from "@/stores/user/useUserStore";

const { getUser } = useUserStore();
getUser();

const store = useModalStore();

const { getMovies, searchMovie } = useMoviesStore();
onMounted(() => {
  getMovies();
});

const searchValue = ref(null);
const movieStore = useMoviesStore();

function submitSearch(values) {
  movieStore.searchValue = values.search;
}

const filteredMovies = computed(() => {
  return searchMovie();
});

const moviesTotal = computed(() => {
  return filteredMovies.value.length;
});

const isSearchBarVisible = ref(false);

function toggleSearchBar() {
  isSearchBarVisible.value = !isSearchBarVisible.value;
}
</script>

<style scoped>
.animate-fade-in {
  animation: fade-in 0.5s ease forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
