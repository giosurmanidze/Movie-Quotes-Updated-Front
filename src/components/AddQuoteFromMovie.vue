<template>
  <crud-modal
    @click="store.toggleAddQuoteFromMovie()"
    :showModal="store.showAddQuoteFromMoviesModal"
  >
    <template v-slot:header>
      <p class="xs:text-md md:text-xl">{{ $t("write_new_quote") }}</p>
      <div @click="store.toggleAddQuotesModal()" class="absolute right-10 top-7">
        <CloseIcon @click="store.toggleAddQuoteFromMovie()" /></div
    ></template>
    <template v-slot:body>
      <Form @submit="submit">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="userAvatar"
              class="xs:h-14 xs:w-[3.7rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <div class="mt-5 sm:flex gap-4">
            <img
              class="w-full sm:w-[15.625rem] h-[8.125rem] rounded-xl mt-3"
              alt="movie img"
              :src="imagePath"
            />
            <section class="flex flex-col mt-5 gap-4">
              <p>{{ movieName }}</p>
              <div class="flex gap-3">
                <p
                  v-for="genre in genres"
                  :key="genre"
                  class="bg-genre_text py-1 px-2 rounded font-bold"
                >
                  {{ genre.genre["en"] }}
                </p>
              </div>

              <p>{{ $t("director") }} : {{ movieDirector }}</p>
            </section>
          </div>
          <section class="mt-5">
            <crud-input
              lang="en"
              name="bodyEn"
              rules="required|en"
              placeholder='"Quote in English."'
              inputType="textarea"
              classes="xs:text-base sm:text-xl"
            />
            <crud-input
              lang="ka"
              name="bodyKa"
              rules="required|geo"
              placeholder='"ციტატა ქართულ ენაზე"'
              inputType="textarea"
              classes="xs:text-base sm:text-xl"
            />
            <DragAndDrop name="thumbnail" rules="required" :imgValue="imgValue" />
            <button
              type="submit"
              class="w-full bg-red-600 py-2"
              @click="store.toggleAddQuoteFromMovie()"
            >
              {{ $t("add_quote") }}
            </button>
          </section>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import CrudModal from "@/components/CrudModal.vue";
import axios from "@/config/axios/auth-index";
import CrudInput from "@/components/CrudInput.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/useUserStore";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useI18n } from "vue-i18n";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";
import DragAndDrop from "@/components/DragAndDrop.vue";

const { user, userAvatar } = storeToRefs(useUserStore());

const store = useModalStore();
const props = defineProps(["movie"]);

const movie = ref();

const genres = ref();

watch(
  () => props.movie,
  (state) => {
    movie.value = state;
    genres.value = movie.value.genres;
  }
);

const { locale } = useI18n();

const movieName = computed(() => {
  return movie.value?.name[locale.value];
});

const movieDirector = computed(() => {
  return movie.value?.director[locale.value];
});

const movieId = computed(() => {
  return movie.value?.id;
});

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + movie.value?.thumbnail;
});

const moviesStore = useMoviesStore();
const imgValue = ref(true);

function submit(values, { resetForm }) {
  let data = {
    body_en: values.bodyEn,
    body_ka: values.bodyKa,
    thumbnail: values.thumbnail,
    movie_id: movieId.value,
  };

  imgValue.value = true;
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  axios
    .post("api/quotes", data, config)
    .then((response) => {
      store.toggleQuoteAddedModal();
      moviesStore.quotes.unshift(response.data);
      resetForm();
      imgValue.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
