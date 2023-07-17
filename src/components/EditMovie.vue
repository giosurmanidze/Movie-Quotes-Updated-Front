<template>
  <crud-modal @click="store.toggleEditModal(false)" :showModal="store.showEditMovieModal">
    <template v-slot:header
      ><p class="xs:text-md md:text-xl">{{ $t("edit_movie") }}</p>
      <div @click="store.toggleEditModal(false)" class="absolute right-10 top-7">
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <Form @submit="submit">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="userAvatar"
              class="h-10 lg:h-[3rem] rounded-full max-w-[3.75rem]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <section class="mt-5">
            <crud-input
              lang="en"
              name="nameEn"
              rules="required|en"
              placeholder="Movie name"
              :oldValue="userData?.name.en"
            />
            <crud-input
              lang="ka"
              name="nameKa"
              rules="required|geo"
              placeholder="ფილმის სახელი"
              :oldValue="userData?.name.ka"
            />
            <GenreInput :categories="categories" />
            <crud-input
              lang="en"
              name="directorEn"
              rules="required|en"
              placeholder="Director"
              :oldValue="userData?.director.en"
            />
            <crud-input
              lang="ka"
              name="directorKa"
              rules="required|geo"
              placeholder="რეჟისორი"
              classes="xs:text-md sm:text-base"
              :oldValue="userData?.director.ka"
            />
            <crud-input
              lang="ka"
              name="descriptionKa"
              rules="required|geo"
              placeholder="ფილმის აღწერა"
              inputType="textarea"
              classes="xs:text-md sm:text-base"
              :oldValue="userData?.description.ka"
            />
            <crud-input
              lang="en"
              name="descriptionEn"
              rules="required|en"
              placeholder="Description"
              inputType="textarea"
              :oldValue="userData?.description.en"
            />
            <crud-input
              name="budget"
              type="number"
              rules="required"
              :placeholder="$t('budget')"
              :oldValue="userData?.budget"
            />
            <crud-input
              name="year"
              type="number"
              rules="required"
              :placeholder="$t('release_date')"
              :oldValue="userData?.release_date"
            />
            <DragAndDrop name="thumbnail1" rules="" />
            <button type="submit" class="w-full bg-red-600 py-2">
              {{ $t("save_changes") }}
            </button>
          </section>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import CrudModal from "@/components/CrudModal.vue";
import CrudInput from "@/components/CrudInput.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import DragAndDrop from "@/components/DragAndDrop.vue";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/useUserStore";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import axios from "@/config/axios/auth-index";
import GenreInput from "@/components/GenreInput.vue";
import { useEditMovie } from "@/services";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";

const store = useModalStore();
const route = useRoute();
const params = ref(route.params.id);
const userData = ref();

const categories = ref([]);
const { user, userAvatar } = storeToRefs(useUserStore());
const { getCategories } = useMoviesStore();

onMounted(async () => {
  getCategories();
});
axios.get(`api/movies/${params.value}`).then((response) => {
  userData.value = response.data;
  categories.value = response?.data?.genres;
});

const { submit } = useEditMovie(params, categories);
</script>
