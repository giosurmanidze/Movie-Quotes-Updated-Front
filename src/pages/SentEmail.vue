<template>
  <message-modal
    headerText="sent_email_header_title"
    msg="sent_email_header_text"
    btnText="sent_email_submit_btn"
    classes="bg-btn_color w-full h-[5vh]"
    route="login"
    img="emailSent"
  />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
</script>
