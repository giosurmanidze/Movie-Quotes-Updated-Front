<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-[#DDCCAA]">{{ $t('movie_quotes') }}</span>
    <div class="flex items-center gap-6 text-[#fff]">
      <lang-changer />
      <Button text="sign_up" classes="bg-[#E31221]" />
      <Button text="login" classes="border-2 border-[#fff]" />
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'
import LangChanger from './LangChanger.vue'
</script>
