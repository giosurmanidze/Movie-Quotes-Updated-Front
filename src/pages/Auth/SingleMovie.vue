<template>
  <menu-layout>
    <div class="text-white">
      <h2 class="mb-4">{{ $t("movie_description") }}</h2>
      <EditMovie />
      <div class="xl:flex">
        <section class="xl:w-2/3 pr-3">
          <img :src="imagePath" alt="image poster" class="rounded-md" />
          <section class="hidden xl:flex items-center">
            <p class="my-7 pr-3 border-r border-gray-500">
              {{ $t("quotes") }} ({{ $t("total") }}) ({{ moviesStore.quotes?.length }})
            </p>
            <section class="pl-3">
              <button
                class="bg-red-600 border-0 truncate py-2 px-3 rounded"
                @click="toggleAddQuoteFromMovie()"
              >
                {{ $t("add_quote") }}
              </button>
            </section>
          </section>
        </section>
        <section class="xl:w-1/3 mr-3 xl:mr-16 mt-5 xl:mt-0 items-center">
          <section class="flex justify-between">
            <div>
              <p class="text-lg text-[#DDCCAA]">{{ movieName }} ({{ releaseDate }})</p>
            </div>
            <div
              class="grid grid-cols-2 divide-x items-center bg-[#24222F] py-2 px-5 rounded"
            >
              <section class="pr-5 cursor-pointer" @click="store.toggleEditModal()">
                <EditIcon />
              </section>
              <section class="pl-5 cursor-pointer" @click="deleteMovieById()">
                <DeleteIcon />
              </section>
            </div>
          </section>
          <section class="flex gap-2 xl:mt-7">
            <p
              v-for="genre in genres"
              :key="genre"
              class="bg-[#6C757D] py-1 px-2 rounded font-bold"
            >
              {{ genre }}
            </p>
          </section>
          <section class="my-4">
            <p>{{ $t("director") }} : {{ movieDirector }}</p>
            <p class="my-5">{{ $t("budget") }} : {{ movieBudget }}$</p>
            <p>
              {{ movieDescription }}
            </p>
          </section>
          <section class="flex xl:hidden items-center">
            <p class="my-7 pr-3 border-r border-gray-500">
              {{ $t("quotes") }} ({{ $t("total") }} {{ moviesStore.quotes?.length }})
            </p>
            <section class="pl-3">
              <button class="bg-red-600 border-0 truncate py-2 px-3 rounded">
                {{ $t("add_quote") }}
              </button>
            </section>
          </section>
        </section>
      </div>
      <section class="pt-5 xl:w-2/3 xl:pr-12 break-all">
        <QuoteCard
          v-for="quote in quotes"
          :key="quote.id"
          :id="quote.id"
          :quoteId="quote.id"
          :associatedQuote="quote.body"
          :associatedThumbnail="quote.thumbnail"
          @click="getQuote(quote.id)"
        />
      </section>
    </div>
  </menu-layout>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
import MenuLayout from "@/components/MenuLayout.vue";
import { useI18n } from "vue-i18n";
import QuoteCard from "@/components/QuoteCard.vue";
import { useMoviesStore } from "@/stores/useMoviesStore";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import { fetchMovie } from "@/services";
import EditMovie from "@/components/EditMovie.vue";
import { useModalStore } from "@/stores/useModalStore";

const { getUser } = useUserStore();
getUser();

const route = useRoute();

const { getQuote } = useQuotesStore();
const params = ref(route.params.id);
const store = useModalStore();

const moviesStore = useMoviesStore();
const { locale } = useI18n();

const { movie, genres } = fetchMovie(params);

watch(
  () => moviesStore.edited,
  (state) => {
    if (state) {
      fetchMovie(params);
    }
  }
);

const { updatedMovie } = useMoviesStore();

watch(
  () => updatedMovie.value,
  (state) => {
    movie.value = state;
    genres.value = JSON.parse(state.genre);
  }
);

const { quotes } = storeToRefs(useMoviesStore());

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + movie.value?.thumbnail;
});

const movieName = computed(() => {
  return movie.value?.name[locale.value];
});

const movieDirector = computed(() => {
  return movie.value?.director[locale.value];
});

const movieDescription = computed(() => {
  return movie.value?.description[locale.value];
});

const movieBudget = computed(() => {
  return movie.value?.budget;
});

const releaseDate = computed(() => {
  return movie.value?.release_date;
});
</script>
