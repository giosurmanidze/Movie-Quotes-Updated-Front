<template>
  <div class="w-full flex justify-between items-center">
    <span class="text-[#DDCCAA]">MOVIE QUOTES</span>
    <div class="flex items-center gap-6 text-[#fff]">
      <span class="xs:hidden sm:flex items-center gap-2 lg:text-xl"
        >Eng <img src="../assets/caret-right-fill.svg" class="mt-1"
      /></span>
      <Button text="Sign up" styles="bg-[#E31221]" />
      <Button text="Log in" styles="border-2 border-[#fff]" />
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'
</script>
