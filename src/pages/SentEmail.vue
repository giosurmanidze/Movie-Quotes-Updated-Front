<template>
  <message-modal
    headerText="Thank you!"
    msg=" Please check your email and follow the instructions to activate your account."
    btnText="Go to my email"
    classes="bg-[#E31221] w-full h-[5vh]"
    route="/login"
    dialogName="login"
  />
</template>

<script setup>
import MessageModal from '@/components/MessageModal.vue'
</script>
