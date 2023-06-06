<template>
  <div class="flex justify-center text-white z-10">
    <div class="md:relative">
      <button @click="toggleDropdown" class="mr-8 inline-flex relative">
        <notification-icon />
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
          <p class="md:text-xl text-sm">{{ $t('notifications') }}</p>
          <p
            @click="markAllAsReadHandler()"
            class="md:text-sm text-xs pt-1 underline underline-offset-1 cursor-pointer hover:text-red-500"
          >
            {{ $t('mark_as_read') }}
          </p>
        </div>
        <div v-for="notification in notifications" :key="notification.id" class="py-2">
          <div class="flex justify-between p-5 border border-gray-600 rounded">
            <section class="flex">
              <img
                :src="
                  notification.thumbnail
                    ? notification.thumbnail
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                "
                class="md:h-[80px] h-[50px] rounded-full border max-w-[80px]"
                :class="!notification.read ? 'border-green-500' : ''"
              />
              <section class="flex flex-col">
                <p class="ml-4 md:mt-2 md:text-base">
                  {{ notification.username }}
                </p>
                <p
                  v-if="notification.type === 'comment'"
                  class="ml-4 md:mt-3 mt-1 md:text-base text-center flex"
                >
                  <span class="mr-2 mt-0.5"> <commented-icon /></span>
                  {{ $t('commented_to_your_movie_quote') }}
                </p>
                <p v-else class="ml-4 md:mt-3 mt-1 md:text-base text-center flex">
                  <span class="mr-2 mt-0.5"> <liked-quote-icon /></span>
                  {{ $t('reacted_to_your_quote') }}
                </p>
              </section>
            </section>
            <section class="flex flex-col">
              <p class="ml-4 md:mt-2 md:text-base">
                {{ Math.ceil((Date.now() - new Date(notification.created_at)) / 60000) }}
                {{ $t('min_ago') }}
              </p>
              <p
                v-if="!notification.read"
                class="ml-4 md:mt-3 mt-1 md:text-base text-end text-[#198754]"
              >
                {{ $t('new') }}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentedIcon from '@/assets/icons/CommentedIcon.vue'
import NotificationIcon from '@/assets/icons/NotificationIcon.vue'
import LikedQuoteIcon from '@/assets/icons/LikeIcon.vue'

const dropdownState = ref(false)
const unreadNotifications = ref(0)

const toggleDropdown = () => {
  dropdownState.value = !dropdownState.value
}

const notifications = [
  {
    username: 'giorgi',
    thumbnail: 'https://avatars.githubusercontent.com/u/91054978?v=4',
    read: true,
    type: 'comment',
    created_at: '06/06/2023'
  }
]
</script>
