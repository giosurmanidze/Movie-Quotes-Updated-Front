<template>
  <div>
    <div v-for="(item, index) in quotes" :key="index">
      <div
        class="xs:h-[50vh] paralax-scroll fit md:h-screen bg-size pt-[30%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <div class="max-w-[12.5rem] md:max-w-[31.25] lg:max-w-[56.25] flex space-x-1">
          <div class="flex items-center h-4 lg:h-12">
            <div class="w-3 lg:w-14 xs:h-[1px] md:h-1 bg-white"></div>
          </div>
          <div>
            <blockquote class="text-white text-sm lg:text-5xl">
              {{ $t(item.quote) }}
            </blockquote>
            <address class="text-white text-xs lg:text-3xl mt-4">
              {{ $t(item.movie) }}, {{ item.year }}
            </address>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { quotes } from "@/stores/quotes";
import { ref } from "vue";
let scrolled = ref(false);
window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight * 0.8) {
    scrolled.value = true;
  } else {
    scrolled.value = false;
  }
});
</script>
<style scoped>
.fit {
  background-size: 100% 100%;
}
.paralax-scroll {
  background-position: center center;
  background-attachment: fixed;
}
</style>
