<template>
  <div class="text-white mb-5" @click="navigateToMovie()">
    <section>
      <img class="rounded-md w-80 h-[14.375rem]" :src="imagePath" />
    </section>
    <section>
      <p class="my-3">{{ movieName }} ({{ releaseDate }})</p>
      <div class="flex items-center">
        <p class="mr-3">{{ numberOfQuotes }}</p>
        <QuoteIcon />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import QuoteIcon from "@/assets/icons/QuoteIcon.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  name: { type: Object, required: true },
  thumbnail: { type: String, required: true },
  id: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  numberOfQuotes: { type: Number, required: true },
});

const backendUrl = import.meta.env.VITE_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + props.thumbnail;
});

const movieName = computed(() => {
  const { locale } = useI18n();

  return props.name[locale.value];
});

const router = useRouter();

function navigateToMovie() {
  router.push({ name: "moviePage", params: { id: props.id } });
}
</script>
