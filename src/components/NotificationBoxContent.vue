<template>
  <div v-for="notification in notifications" :key="notification.id" class="py-2">
    <div class="flex justify-between p-5 border border-gray-600 rounded">
      <section class="flex">
        <img
          :src="
            notification.sender.profile_picture
              ? backendUrl + notification.sender.profile_picture
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="md:h-[80px] h-[50px] rounded-full border max-w-[80px]"
          :class="!notification.read ? 'border-green-500' : ''"
        />
        <section class="flex flex-col">
          <p class="ml-4 md:mt-2 md:text-base">
            {{ notification.sender.username }}
          </p>
          <p
            v-if="notification.type === 'comment'"
            class="ml-4 md:mt-3 mt-1 md:text-base text-center flex"
          >
            <span class="mr-2 mt-0.5"> <CommentedIcon /></span>
            {{ $t("commented_to_your_movie_quote") }}
          </p>
          <p v-else class="ml-4 md:mt-3 mt-1 md:text-base text-center flex">
            <span class="mr-2 mt-0.5"> <LikedQuoteIcon /></span>

            {{ $t("reacted_to_your_quote") }}
          </p>
        </section>
      </section>
      <section class="flex flex-col">
        <p class="ml-4 md:mt-2 md:text-base">
          {{ Math.ceil((Date.now() - new Date(notification.created_at)) / 60000) }}
          {{ $t("min_ago") }}
        </p>
        <p
          v-if="!notification.read"
          class="ml-4 md:mt-3 mt-1 md:text-base text-end text-[#198754]"
        >
          {{ $t("new_notification") }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import CommentedIcon from "@/assets/icons/CommentedIcon.vue";
import LikedQuoteIcon from "@/assets/icons/LikedIcon.vue";
import { defineProps } from "vue";

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const props = defineProps({
  notifications: {
    type: Object,
    required: true,
  },
});
</script>
