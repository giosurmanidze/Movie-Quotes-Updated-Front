<template>
  <message-modal
    headerText="changed_password_header_title"
    msg="changed_password_header_text"
    btnText="log_in_btn"
    classes="bg-btn_color w-full h-[5vh]"
    route="/login"
    img="success"
  />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
</script>
