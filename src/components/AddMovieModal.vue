<template>
  <crud-modal
    @click="store.toggleAddMoviesModal(false)"
    :showModal="store.showAddMoviesModal"
  >
    <template v-slot:header
      ><p class="xs:text-md md:text-xl">{{ $t("add_movie") }}</p>
      <div @click="store.toggleAddMoviesModal(false)" class="absolute right-10 top-7">
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <Form @submit="submit">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="userAvatar"
              class="xs:h-16 xs:w-[4rem] h-10 lg:h-[3.5rem] rounded-full max-w-[4rem]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <section class="mt-5" :class="font">
            <CrudInput
              lang="en"
              name="nameEn"
              rules="required|en"
              placeholder="Movie name"
            />
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <CrudInput
              lang="ka"
              name="nameKa"
              rules="required|geo"
              placeholder="ფილმის სახელი"
            />
            <GenreInput :categories="categories" />
            <CrudInput
              lang="en"
              name="directorEn"
              rules="required|en"
              placeholder="Director"
            />
            <CrudInput
              lang="ka"
              name="directorKa"
              rules="required|geo"
              placeholder="რეჟისორი"
            />
            <crud-input
              lang="ka"
              name="descriptionKa"
              rules="required|geo"
              placeholder="ფილმის აღწერა"
              inputType="textarea"
              classes="xs:text-md sm:text-base"
            />
            <crud-input
              lang="en"
              name="descriptionEn"
              rules="required|en"
              placeholder="Description"
              inputType="textarea"
            />
            <CrudInput
              name="budget"
              rules="required|numeric"
              :placeholder="$t('budget')"
            />
            <CrudInput
              name="year"
              rules="required|numeric"
              :placeholder="$t('release_date')"
            />
            <DragAndDrop name="thumbnail" rules="required" :imgValue="imgValue" />
          </section>
          <button class="w-full bg-red-600 py-2" type="submit">
            {{ $t("add_movie") }}
          </button>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import CrudModal from "@/components/CrudModal.vue";
import CrudInput from "@/components/CrudInput.vue";
import DragAndDrop from "@/components/DragAndDrop.vue";
import { useModalStore } from "@/stores/modal/useModalStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/useUserStore";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import GenreInput from "@/components/GenreInput.vue";
import { ref } from "vue";
import { useCreateMovie } from "@/services";
import { useMoviesStore } from "@/stores/movies/useMoviesStore";
import { onMounted } from "vue";
import useFont from "@/config/font/useFont.js";

const font = useFont();
const { user, userAvatar } = storeToRefs(useUserStore());
const store = useModalStore();
const { getCategories } = useMoviesStore();

const categories = ref([]);
onMounted(async () => {
  getCategories();
});
const { submit, imgValue, errorMessage } = useCreateMovie(categories);
</script>
