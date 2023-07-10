<template>
  <div>
    <div v-for="(item, index) in quotes" :key="index">
      <div
        class="xs:h-[50vh] paralax-scroll fit md:h-screen pt-[30%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <div class="md:max-w-[31.25] lg:max-w-[56.25] flex space-x-1">
          <div class="flex items-center h-4 lg:h-12">
            <div class="w-3 lg:w-14 xs:h-[1px] md:h-1 bg-white"></div>
          </div>
          <div>
            <blockquote class="text-white xs:text-base lg:text-5xl">
              {{ $t(item.quote) }}
            </blockquote>
            <address class="text-white xs:text-sm lg:text-3xl mt-4">
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
.fit {
  background-size: 100% 100%;
}
.paralax-scroll {
  background-position: center center;
  background-attachment: fixed;
}
</style>
