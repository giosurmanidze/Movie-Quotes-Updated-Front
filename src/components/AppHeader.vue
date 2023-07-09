<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-text_color xs:text-sm sm:text-lg">{{ $t("movie_quotes") }}</span>
    <div class="flex items-center gap-6 text-white">
      <lang-changer class="xs:hidden" />
      <custom-button text="sign_up" :route="'/signup'" classes="bg-btn_color" />
      <custom-button
        text="log_in_btn"
        :route="'/login'"
        classes="border-2 border-white"
      />
    </div>
  </div>
</template>

<script setup>
import CustomButton from "./CustomButton.vue";
import LangChanger from "./LangChanger.vue";
</script>

<style scoped>
@media screen and (min-width: 340px) {
  .modal-content {
    max-width: 600px;
    max-height: 80vh;
  }
}
.blur-bg {
  background: rgba(0, 0, 0, 0.54);
  backdrop-filter: blur(3px);
}
</style>
