<template>
  <message-modal
    headerText="recover_instrc_header_title"
    msg="recover_instrc_header_text"
    btnText="recover_instrc_submit_btn"
    classes="bg-btn_color w-full h-[5vh]"
    route="login"
    img="emailSent"
  />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
</script>
