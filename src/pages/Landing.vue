<template>
  <div class="lg:block">
    <div class="h-[80vh] bg-banner_gradient pt-8 px-8 lg:px-16">
      <Header />
      <div class="h-[60vh] w-full flex justify-center items-center">
        <div class="flex flex-col items-center space-y-6 w-[400px] lg:w-[800px]">
          <h1 class="text-[#DDCCAA] text-2xl lg:text-6xl text-center">
            Find any quote in millions of movie lines
          </h1>
          <Button text="Get Started" styles="bg-[#E31221]" />
        </div>
      </div>
    </div>
    <LandingImageCard />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Button from '../components/Button.vue'
import LandingImageCard from '../components/LandingImageCard.vue'
</script>
