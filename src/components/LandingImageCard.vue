<template>
  <div>
    <div v-for="(item, index) in quotes" :key="index">
      <div
        class="parallax xs:h-[50vh] md:h-screen pt-[0%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
        :style="{
          backgroundImage: `url(${item.img})`,
          backgroundPositionY: scrollPosition(item, index),
        }"
      >
        <div class="max-w-[12.5rem] md:max-w-[31.25] lg:max-w-[56.25] flex space-x-1">
          <div class="flex items-center h-4 lg:h-12">
            <div class="w-3 lg:w-14 xs:h-[0.0625rem] md:h-1 bg-white"></div>
          </div>
          <div>
            <blockquote class="text-white text-sm lg:text-5xl">
              “{{ $t(item.quote) }}”
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
import { ref, onMounted, onUnmounted } from "vue";
import { quotes } from "@/stores/quotes";

const scrollY = ref(0);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  scrollY.value = window.scrollY;
}
function scrollPosition(item, index) {
  const scrollOffset = scrollY.value - index * window.innerHeight;
  return `${scrollOffset * 0.1}px`;
}
</script>

<style scoped>
.parallax {
  background-size: 100% auto;
  background-repeat: no-repeat;
}

@media (min-width: 1280px) {
  .parallax {
    background-position-x: center;
  }
}
</style>
