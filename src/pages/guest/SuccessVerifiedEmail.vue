<template>
  <message-modal
    headerText="success_header_title"
    msg="success_header_text"
    btnText="success_submit_btn"
    classes="bg-btn_color w-full h-[5vh]"
    route="login"
    img="success"
  />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import axios from "@/config/axios/index";

const route = useRoute();
onMounted(async () => {
  await axios.post("api/email/verify", { email: route.query.email });
});
</script>
