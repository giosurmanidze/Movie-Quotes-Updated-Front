<template>
  <div class="flex justify-center text-white z-1">
    <div class="md:relative">
      <button @click="toggleDropdown" class="mr-6 inline-flex relative">
        <notification-icon />
        <div
          v-if="unreadNotificationCount"
          class="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
        >
          {{ unreadNotificationCount }}
        </div>
      </button>
      <div
        v-if="dropdownState"
        class="overflow-y-auto max-h-[37.5rem] origin-top-right px-10 py-3 md:p-6 absolute mt-2 right-0 md:right-5 bg-black w-screen md:w-[38.75rem] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="flex justify-between mt-3 mb-5">
          <p class="md:text-xl text-sm">{{ $t("notifications") }}</p>
          <p
            @click="markAllAsReadHandler()"
            class="md:text-sm text-xs pt-1 underline underline-offset-1 cursor-pointer hover:text-red-500"
          >
            {{ $t("mark_as_read") }}
          </p>
        </div>
        <notification-box-content :notifications="notifications" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import NotificationIcon from "@/assets/icons/NotificationIcon.vue";
import NotificationBoxContent from "@/components/NotificationBoxContent.vue";
import { useQuotesStore } from "@/stores/quotes/useQuotesStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { usePostStore } from "@/stores/posts/posts";
import { storeToRefs } from "pinia";
import axios from "@/config/axios/index";

const dropdownState = ref(false);
const notifications = ref([]);

const { getQuotesRefresh } = useQuotesStore();
const { refreshPosts } = usePostStore();
const { user } = storeToRefs(useUserStore());

const toggleDropdown = () => {
  dropdownState.value = !dropdownState.value;
};

watch(
  () => user.value.id,
  (state) => {
    user.value.id = state;
    window.Echo.private(`comments.${state}`).listen(
      "CommentedQuote",
      ({ notification }) => {
        notifications.value.unshift(notification);
        getQuotesRefresh();
        refreshPosts();
      }
    );
    window.Echo.private(`likes.${state}`).listen("LikedQuote", ({ notification }) => {
      notifications.value.unshift(notification);
      getQuotesRefresh();
      refreshPosts();
    });
  }
);

onMounted(() => {
  axios.get("api/get-notifications").then((response) => {
    notifications.value = response.data;
  });
});

const unreadNotificationCount = computed(() => {
  return notifications.value.filter((notification) => !notification.read).length;
});

function markAllAsReadHandler() {
  unreadNotificationCount.value = 0;
  axios.post("api/mark-read").then((response) => {
    notifications.value = response.data;
  });
}
</script>
