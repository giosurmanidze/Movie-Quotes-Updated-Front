<template>
  <div class="text-white">
    <section class="flex cursor-pointer" @click="navigateToProfilePage()">
      <img
        :src="
          user.profile_picture
            ? user.profile_picture
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        "
        class="h-[40px] md:h-[45px] lg:h-[60px] max-w-[60px] rounded-full"
        :class="$route.name === 'profile' ? 'border-2 border-red-600' : ''"
      />
      <section class="flex-col ml-3 lg:mt-1">
        <p class="text-base">{{ user.username }}</p>
        <button
          class="text-xs text-[#CED4DA] text-start sm:truncate md:w-[100px] lg:w-[150px]"
        >
          {{ $t("edit_your_profile") }}
        </button>
      </section>
    </section>
    <section class="mt-8 ml-2">
      <router-link :to="{ name: 'newsFeed' }" class="flex items-center cursor-pointer">
        <home-icon :path="$route.name" />
        <p class="ml-4 md:text-sm lg:text-lg">{{ $t("news_feed") }}</p>
      </router-link>
      <router-link
        :to="{ name: 'movieList' }"
        class="flex items-center mt-8 cursor-pointer"
      >
        <movies-list-icon :path="$route.name" />
        <p class="ml-4 truncate md:text-sm lg:text-lg">
          {{ $t("list_of_movies") }}
        </p>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import MoviesListIcon from "@/assets/icons/ChooseMovieIcon.vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

const { getUser } = useUserStore();
getUser();
const { user } = storeToRefs(useUserStore());
</script>
