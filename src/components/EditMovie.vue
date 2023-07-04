<template>
  <crud-modal @click="store.toggleEditModal(false)" :showModal="store.showEditMovieModal">
    <template v-slot:header
      >{{ $t("edit_movie") }}
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
            <CrudInput
              lang="en"
              name="nameEn"
              rules="required|en"
              placeholder="Movie name"
              :oldValue="userData?.name.en"
            />
            <CrudInput
              lang="ka"
              name="nameKa"
              rules="required|geo"
              placeholder="ფილმის სახელი"
              :oldValue="userData?.name.ka"
            />
            <GenreInput name="genre" :values="genres" />
            <CrudInput
              lang="en"
              name="directorEn"
              rules="required|en"
              placeholder="Director"
              :oldValue="userData?.director.en"
            />
            <CrudInput
              lang="ka"
              name="directorKa"
              rules="required|geo"
              placeholder="რეჟისორი"
              :oldValue="userData?.director.ka"
            />
            <CrudInput
              lang="en"
              name="descriptionEn"
              rules="required|en"
              placeholder="Description"
              :oldValue="userData?.description.en"
            />
            <CrudInput
              lang="ka"
              name="descriptionKa"
              rules="required|geo"
              placeholder="ფილმის აღწერა"
              :oldValue="userData?.description.ka"
            />
            <CrudInput
              name="budget"
              rules="required"
              :placeholder="$t('budget')"
              :oldValue="userData?.budget"
            />
            <CrudInput
              name="releaseDate"
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import CrudModal from "@/components/CrudModal.vue";
import CrudInput from "@/components/CrudInput.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import DragAndDrop from "@/components/DragAndDrop.vue";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import axios from "@/config/axios/auth-index";
import GenreInput from "@/components/GenreInput.vue";
import { useEditMovie } from "@/services";

const { user, userAvatar } = storeToRefs(useUserStore());
const store = useModalStore();

const route = useRoute();
const params = ref(route.params.id);

const userData = ref();
const genres = ref([]);

axios.get(`api/movies/${params.value}`).then((response) => {
  userData.value = response.data;
  genres.value = JSON.parse(response.data.genres);
});

const { submit } = useEditMovie(params);
</script>
