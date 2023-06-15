<template>
  <div>
    <div v-for="(item, index) in quotes" :key="index">
      <div
        class="xs:h-[50vh] md:h-[100vh] bg-size pt-[30%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <div class="max-w-[200px] md:max-w-[500px] lg:max-w-[900px] flex space-x-1">
          <div class="flex items-center h-4 lg:h-12">
            <div class="w-3 lg:w-14 xs:h-[1px] md:h-1 bg-white"></div>
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
import { quotes } from "@/stores/quotes";
</script>
<style scoped>
.bg-size {
  background-size: 100% 100%;
}
</style>
