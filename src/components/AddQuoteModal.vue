<template>
  <crud-modal
    @click="store.toggleAddQuotesModal(false)"
    :showModal="store.showAddQuotesModal"
  >
    <template v-slot:header
      ><div :class="`xs:text-md md:text-xl ${font}`">{{ $t("write_new_quote") }}</div>
      <div @click="store.toggleAddQuotesModal(false)" class="absolute right-10">
        <close-icon /></div
    ></template>
    <template v-slot:body>
      <Form @submit="submit" v-if="movies.length">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="userAvatar"
              class="xs:h-16 xs:w-[4rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <section class="mt-5">
            <crud-input
              lang="en"
              name="bodyEn"
              rules="required|en"
              placeholder="Start create new quote"
              inputType="textarea"
              classes="placeholder-genre_text text-white xs:text-base sm:text-xl"
            />
            <crud-input
              lang="ka"
              name="bodyKa"
              rules="required|geo"
              placeholder="ახალი ციტატა"
              inputType="textarea"
              classes="placeholder-genre_text text-white xs:text-base sm:text-xl"
            />
            <drag-and-drop name="thumbnail" rules="required" :imgValue="imgValue" />
            <div class="text-white items-center text-center relative cursor-default">
              <div v-if="showSelectPlaceholder" class="absolute top-5 px-3">
                <section class="flex items-center">
                  <choose-movie-icon />
                  <p class="text-xl ml-3">{{ $t("choose_movie") }}</p>
                </section>
              </div>
              <Field
                class="w-full p-6 mb-5 bg-[#000000] cursor-pointer"
                name="movie"
                as="select"
                @click="showSelectPlaceholder = false"
                rules="required"
              >
                <option v-for="(movie, index) in movies" :key="index" :value="movie.id">
                  {{ movie?.name[locale] }}
                </option>
              </Field>
              <div class="text-left mt-[-0.125rem] mb-2">
                <error-message class="text-red-300" name="movie" />
              </div>
            </div>

            <button class="w-full bg-red-600 py-2" type="submit">
              {{ $t("add_quote") }}
            </button>
          </section>
        </section>
      </Form>
      <p class="my-3 text-red-500 text-center" v-else>
        {{ $t("no_movies_yet") }}
      </p>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref } from "vue";
import CrudModal from "@/components/CrudModal.vue";
import CrudInput from "@/components/CrudInput.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { Form } from "vee-validate";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { Field, ErrorMessage } from "vee-validate";
import ChooseMovieIcon from "@/assets/icons/ChooseMovieIcon.vue";
import DragAndDrop from "@/components/DragAndDrop.vue";
import { useCreateQuote } from "@/services/index";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import useFont from "@/config/font/useFont.js";

const font = useFont();
const store = useModalStore();
const { locale } = useI18n();
const showSelectPlaceholder = ref(true);
const { userAvatar, user } = storeToRefs(useUserStore());
const { getMovies } = useMoviesStore();
getMovies();

const { movies } = storeToRefs(useMoviesStore());

const { submit, imgValue } = useCreateQuote();
</script>
