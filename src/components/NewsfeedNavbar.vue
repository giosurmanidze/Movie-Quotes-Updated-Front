<template>
  <body class="bg-main_bg_color">
    <div>
      <nav
        :class="
          navbarState
            ? 'flex  md:px-16 px-5 py-4 h-20 justify-between items-center bg-main_bg_color'
            : 'flex h-20 justify-between items-center bg-main_bg_color'
        "
      >
        <section class="hidden md:flex">
          <h1 class="text-gold_color text-base font-medium">{{ $t("movie_quotes") }}</h1>
        </section>
        <div v-if="navbarState" class="md:hidden flex text-start">
          <button
            @click="showSidebar = !showSidebar"
            class="flex items-center text-blue-600 p-3"
          >
            <burger-icon />
          </button>
        </div>
        <div
          v-if="navbarState"
          class="text-sm text-gray-400 items-center flex hover:text-gray-500 gap-2"
        >
          <language-dropdown />
          <search-icon @click="navbarState = !navbarState" class="mr-3 block md:hidden" />
          <notifications-dropdown />
          <button
            @click="logout"
            class="hidden md:block bg-transparent text-center text-white py-1.5 px-4 items-center border-white border rounded"
          >
            {{ $t("logout_btn") }}
          </button>
        </div>
        <div
          v-else
          class="flex items-center text-white w-full h-full border-b border-white p-4 bg-main_bg_color"
        >
          <back-arrow-icon @click="navbarState = !navbarState" class="mr-3" />
          <Form @submit="searchSubmit" class="w-full">
            <search-input
              :placeholder="$t('search')"
              name="search"
              :classes="`w-full p-2 text-base bg-transparent`"
              @keyup.enter="store2.searchPosts()"
            />
          </Form>
        </div>
      </nav>
    </div>
    <div
      class="h-[70vh] mt-5 ml-16 text-base text-genre_text sm:hidden z-[-1]"
      v-if="!searchValue && !navbarState && $route.name === 'newsFeed'"
    >
      <div class="flex gap-2">
        <span>{{ t("enter") }}</span>
        <span class="text-white">@</span>
        <span>{{ t("to_search_movies") }}</span>
      </div>
      <div class="flex gap-2 mt-2">
        <span>{{ t("enter") }}</span>
        <span class="text-white">#</span>
        <span>{{ t("to_search_quotes") }}</span>
      </div>
    </div>
    <div v-if="showSidebar" class="relative z-50 xs:block md:hidden">
      <nav
        class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-modal_bg border-r rounded-xl overflow-y-auto"
      >
        <div class="flex items-center mb-8">
          <a class="mr-auto text-3xl font-bold leading-none" href="#">
            <img src="@/assets/video-player.png" />
          </a>
          <button @click="showSidebar = !showSidebar">
            <hide-burger-menu-icon />
          </button>
        </div>
        <div></div>
        <div class="mt-auto flex flex-col justify-between h-full">
          <section class="mt-8 ml-2 flex flex-col gap-4">
            <router-link :to="{ name: 'userProfile' }">
              <div class="flex items-center" @click="showSidebar = !showSidebar">
                <img
                  :src="userAvatar"
                  class="xs:h-16 xs:w-[4rem] rounded-full"
                  :class="$route.name === 'userProfile' ? 'border-2 border-red-600' : ''"
                />
                <div class="flex-col ml-3 lg:mt-1">
                  <p class="text-base text-white">{{ user.username }}</p>
                </div>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'newsFeed' }"
              class="flex items-center cursor-pointer mt-10"
              @click="showSidebar = !showSidebar"
            >
              <home-icon class="mr-5" :path="$route.name" />
              <p class="md:text-sm lg:text-lg text-white">{{ $t("news_feed") }}</p>
            </router-link>
            <router-link
              :to="{ name: 'movieList' }"
              class="flex items-center ursor-pointer"
              @click="showSidebar = !showSidebar"
            >
              <movies-list-icon :path="$route.name" />
              <p class="ml-4 truncate md:text-sm lg:text-lg text-white">
                {{ $t("list_of_movies") }}
              </p>
            </router-link>
          </section>

          <div class="pt-6">
            <a
              @click="logout"
              class="block px-4 py-3 mb-2 leading-loose text-base text-center text-white font-semibold bg-red-500 opacity-90 hover:bg-red-700 hover:scale-110 duration-300 rounded-xl"
              href="#"
              >{{ $t("logout_btn") }}
            </a>
          </div>
        </div>
      </nav>
    </div>
  </body>
</template>

<script setup>
import { Form } from "vee-validate";
import { logoutUser } from "@/services/requests/sendRequest";
import SearchInput from "@/components/SearchInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LanguageDropdown from "@/components/LangChanger.vue";
import NotificationsDropdown from "@/components/NotificationsDropdown.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import BackArrowIcon from "@/assets/icons/BackArrow.vue";
import { useI18n } from "vue-i18n";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import MoviesListIcon from "@/assets/icons/ChooseMovieIcon.vue";
import { RouterLink } from "vue-router";
import BurgerIcon from "@/assets/icons/BurgerIcon.vue";
import HideBurgerMenuIcon from "@/assets/icons/HideBurgerMenuIcon.vue";
import { usePostStore } from "@/stores/posts/posts";
import { useMoviesStore } from "@/stores/movies/useMoviesStore.js";
import { useUserStore } from "@/stores/user/useUserStore";
import { storeToRefs } from "pinia";

const { t } = useI18n({ useScope: "global" });
const { userAvatar } = storeToRefs(useUserStore());
const { getUser } = useUserStore();
getUser();
const { user } = storeToRefs(useUserStore());
const showSidebar = ref(false);
const navbarState = ref(true);
const searchValue = ref("");
const router = useRouter();
const store = usePostStore();

const logout = async () => {
  try {
    await logoutUser();
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};

const movieStore = useMoviesStore();

function searchSubmit(values) {
  searchValue.value = values.search;
  const quotesStore = usePostStore();
  quotesStore.searchValue = values.search;
  movieStore.searchValue = values.search;
  store.searchPosts();
}
</script>
