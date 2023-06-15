<template>
  <body class="bg-blue-500">
    <nav
      :class="
        navbarState
          ? 'flex md:px-16 px-5 py-4 h-[80px] justify-between items-center bg-[#222030]'
          : 'flex h-[80px] justify-between items-center bg-[#222030]'
      "
    >
      <section class="hidden md:flex">
        <h1 class="text-[#DDCCAA] text-base font-medium">{{ $t("movie_quotes") }}</h1>
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
        class="text-sm text-gray-400 items-center flex hover:text-gray-500"
      >
        <language-dropdown />
        <search-icon @click="navbarState = !navbarState" class="mr-5 block md:hidden" />
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
        class="flex items-center text-white w-full h-full border-b border-[#EFEFEF] p-4 bg-[#12101A]"
      >
        <back-arrow-icon @click="navbarState = !navbarState" class="mr-3" />
        <Form @submit="submitForm" class="w-full">
          <search-input
            :placeholder="placeholderText"
            name="search"
            classes="w-full p-2 bg-transparent"
          />
        </Form>
      </div>
    </nav>
    <div v-if="showSidebar" class="relative z-50">
      <nav
        class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-[#11101A] border-r rounded-xl overflow-y-auto"
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
          <section class="mt-8 ml-2">
            <router-link
              :to="{ name: 'newsFeed' }"
              class="flex items-center cursor-pointer"
            >
              <home-icon />
              <p class="ml-4 md:text-sm lg:text-lg text-white">{{ $t("news_feed") }}</p>
            </router-link>
            <router-link
              :to="{ name: 'movieList' }"
              class="flex items-center mt-8 cursor-pointer"
            >
              <movies-list-icon />
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
import { ref, computed } from "vue";
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
import { useQuotesStore } from "@/stores/useQuotesStore";

const { t } = useI18n({ useScope: "global" });
const showSidebar = ref(false);
const navbarState = ref(true);
const router = useRouter();

const logout = async () => {
  try {
    await logoutUser();
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};

const placeholderText = computed(() => {
  return (
    t("enter_to_search") +
    " @ " +
    t("enter_to_search_two") +
    " , " +
    " # - " +
    t("enter_to_search_three")
  );
});

function submitForm(values) {
  const quotesStore = useQuotesStore();
  quotesStore.searchQuery = values.search;
}
</script>
