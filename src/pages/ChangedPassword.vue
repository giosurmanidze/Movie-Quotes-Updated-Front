<template>
  <message-modal
    headerText="Success!"
    msg="Your Password changed successfully"
    btnText="Log in"
    classes="bg-[#E31221] w-full h-[5vh]"
    route="/login"
    img="success"
  />
</template>

<script setup>
import MessageModal from '@/components/MessageModal.vue'
</script>
