<template>
  <message-modal
    headerText="Check your email"
    msg="We have sent a password recover instructions 
to your email"
    btnText="Go to my email"
    classes="bg-[#E31221] w-full h-[5vh]"
    route="/login"
    img="emailSent"
  />
</template>

<script setup>
import MessageModal from '@/components/MessageModal.vue'
</script>
