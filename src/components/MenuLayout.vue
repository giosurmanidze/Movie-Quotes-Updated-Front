<template>
  <div class="h-screen bg-menu_layout_bg pb-20">
    <div class="flex xl:gap-x-24 md:pt-8 h-full">
      <section class="pl-16 hidden md:flex">
        <NewsfeedSidebar />
      </section>
      <section class="w-full px-7 2xl:px-0 mt-5 md:mt-0 overflow-y-auto no-scrollbar">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script setup>
import NewsfeedSidebar from "./NewsfeedSideBar.vue";
</script>
