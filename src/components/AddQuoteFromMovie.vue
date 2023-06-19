<template>
  <crud-modal
    @click="store.toggleAddQuoteFromMovie(false)"
    :showModal="store.showAddQuoteFromMoviesModal"
  >
    <template v-slot:header
      >{{ $t("write_new_quote") }}
      <div @click="store.toggleAddQuotesModal(false)" class="absolute right-10 top-7">
        <CloseIcon @click="store.toggleAddQuoteFromMovie(false)" /></div
    ></template>
    <template v-slot:body>
      <Form @submit="submit">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="user.profile_picture"
              class="h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <div class="mt-5 sm:flex gap-4">
            <img
              class="w-full sm:w-[300px] h-[160px] rounded-md"
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
            <CrudInput
              lang="en"
              name="bodyEn"
              rules="required|en"
              placeholder="Create new quote"
            />
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <CrudInput
              lang="ka"
              name="bodyKa"
              rules="required|geo"
              placeholder="ახალი ციტატა"
            />

            <DragAndDrop name="thumbnail" rules="required" :imgValue="imgValue" />
            <button
              type="submit"
              class="w-full bg-red-600 py-2"
              @click="store.toggleAddQuoteFromMovie(false)"
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
import { useModalStore } from "@/stores/useModalStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useI18n } from "vue-i18n";
import { useMoviesStore } from "@/stores/useMoviesStore";
import DragAndDrop from "@/components/DragAndDrop.vue";

const { user } = storeToRefs(useUserStore());

const store = useModalStore();

const errorMessage = ref("");

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
