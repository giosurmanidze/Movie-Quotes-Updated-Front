<template>
  <div>
    <div
      class="xs:h-screen paralax-scroll fit md:h-screen pt-[30%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
      :style="{ backgroundImage: `url(${props.img})` }"
    >
      <div class="md:max-w-[31.25] lg:max-w-[56.25] flex space-x-1">
        <div class="flex items-center h-4 lg:h-12">
          <div class="w-3 lg:w-14 xs:h-[1px] md:h-1 bg-white"></div>
        </div>
        <div>
          <blockquote class="text-white xs:text-base lg:text-5xl">
            {{ $t(props.quote) }}
          </blockquote>
          <address class="text-white xs:text-sm lg:text-3xl mt-4">
            {{ $t(props.movie) }}, {{ props.year }}
          </address>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  img: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true },
  year: { type: String, required: true },
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
