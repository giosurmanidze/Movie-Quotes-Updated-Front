<template>
  <div class="bg-menu_layout_bg pb-20 lg:pr-48 md:pr-15 sm:pr-0">
    <div class="flex xl:gap-x-24 md:pt-8 h-full">
      <section class="pl-16 hidden md:flex">
        <newsfeed-side-bar />
      </section>
      <section class="mt-5 md:mt-0 h-full min-h-screen">
        <newsfeed-middle-menu />
        <newsfeed-content />
      </section>
    </div>
  </div>
</template>

<script setup>
import NewsfeedMiddleMenu from "@/components/NewsfeedMiddleMenu.vue";
import NewsfeedContent from "@/components/NewsfeedContent.vue";
import NewsfeedSideBar from "@/components/NewsfeedSideBar.vue";
</script>
