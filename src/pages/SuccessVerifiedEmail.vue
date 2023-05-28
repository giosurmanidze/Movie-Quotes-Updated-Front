<template>
  <message-modal
    headerText="Thank you!"
    msg="Your account has been activated."
    btnText="Go to my news feed"
    classes="bg-[#E31221] w-full h-[5vh]"
    route="/login"
  />
</template>

<script setup>
import MessageModal from '@/components/MessageModal.vue'
</script>
