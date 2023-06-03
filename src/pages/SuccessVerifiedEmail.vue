<template>
  <message-modal
    headerText="success_header_title"
    msg="success_header_text"
    btnText="success_submit_btn"
    classes="bg-[#E31221] w-full h-[5vh]"
    route="/login"
    img="success"
  />
</template>

<script setup>
import MessageModal from '@/components/MessageModal.vue'
</script>
