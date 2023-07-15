<template>
  <div class="text-white">
    <router-link :to="{ name: 'userProfile' }">
      <section class="flex cursor-pointer">
        <img
          :src="userAvatar"
          class="h-10 md:h-11 lg:h-[3.75rem] max-w-[3.75rem] rounded-full"
          :class="$route.name === 'userProfile' ? 'border-2 border-red-600' : ''"
        />
        <section class="flex-col ml-3 lg:mt-1">
          <p class="text-base">{{ user.username }}</p>
          <button
            class="text-xs text-[#CED4DA] text-start sm:truncate md:w-[6.25rem] lg:w-[9.375rem]"
          >
            {{ $t("edit_your_profile") }}
          </button>
        </section>
      </section>
    </router-link>
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
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";

const { userAvatar } = storeToRefs(useUserStore());

const { getUser } = useUserStore();
getUser();
const { user } = storeToRefs(useUserStore());
</script>
