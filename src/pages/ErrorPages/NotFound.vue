<template>
  <div class="bg-no_page_bg_color grid h-screen place-items-center text-white pb-20">
    <section class="flex flex-col items-center">
      <not-found-page-icon />
      <h1 class="md:text-4xl text-2xl font-bold mt-10">{{ $t("whoops_text") }}</h1>
      <p class="md:text-lg text-base py-4 text-center px-4">
        {{ $t("error_page_text") }}
      </p>
      <custom-button type="button" text="return_home" classes="bg-btn_color" />
    </section>
  </div>
</template>

<script setup>
import NotFoundPageIcon from "@/assets/icons/NotFoundPageIcon.vue";
import CustomButton from "@/components/CustomButton.vue";
</script>
