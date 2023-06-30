<template>
  <div class="h-screen w-full bg-main_bg_color">
    <message-modal
      headerText="email_updated_successfully"
      msg="email_updated_header_text"
      btnText="go_profile"
      classes="bg-btn_color w-full h-[5vh]"
      :route="'/user-profile/' + userId"
      img="success"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index";
import MessageModal from "@/components/MessageModal.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = ref(route.params.id);

onMounted(async () => {
  loadData();
});

async function loadData() {
  try {
    const response = await axios.get(`api/confirm-account/${userId.value}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
</script>
