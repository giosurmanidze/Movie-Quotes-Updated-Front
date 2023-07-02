<template>
  <div class="flex justify-center text-white z-10">
    <div class="md:relative">
      <button @click="toggleDropdown" class="mr-8 inline-flex relative">
        <NotificationIcon />
        <div
          v-if="unreadNotifications"
          class="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
        >
          {{ unreadNotifications }}
        </div>
      </button>
      <div
        v-if="dropdownState"
        class="overflow-y-auto max-h-[600px] origin-top-right px-10 py-3 md:p-6 absolute mt-2 right-0 md:right-5 bg-black w-screen md:w-[620px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
import { ref, watch, onMounted } from "vue";
import NotificationIcon from "@/assets/icons/NotificationIcon.vue";
import NotificationBoxContent from "@/components/NotificationBoxContent.vue";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import axios from "@/config/axios/index";

const dropdownState = ref(false);
const notifications = ref([]);
const unreadNotifications = ref(0);
const { getQuotesRefresh } = useQuotesStore();
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
      }
    );
    window.Echo.private(`likes.${state}`).listen("LikedQuote", ({ notification }) => {
      notifications.value.unshift(notification);
      getQuotesRefresh();
    });
  }
);

onMounted(() => {
  axios.get("api/get-notifications").then((response) => {
    notifications.value = response.data;
  });
  axios.get("api/get-unread-notifications").then((response) => {
    unreadNotifications.value = response.data;
  });
});

function markAllAsReadHandler() {
  unreadNotifications.value = 0;
  axios.post("api/mark-read").then((response) => {
    notifications.value = response.data;
  });
}

console.log(notifications);
</script>
