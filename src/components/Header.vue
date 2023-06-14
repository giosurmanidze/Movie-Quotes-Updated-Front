<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-[#DDCCAA]">{{ $t("movie_quotes") }}</span>
    <div class="flex items-center gap-6 text-[#fff]">
      <lang-changer />
      <Button text="sign_up" :route="'/signup'" classes="bg-[#E31221]" />
      <Button text="log_in_btn" :route="'/login'" classes="border-2 border-[#fff]" />
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
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
