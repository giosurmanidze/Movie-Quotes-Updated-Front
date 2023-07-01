<template>
  <div class="h-screen w-full bg-main_bg_color">
    <message-modal
      headerText="email_updated_successfully"
      msg="email_updated_header_text"
      btnText="go_profile"
      classes="bg-btn_color w-full h-[5vh]"
      route="/user-profile"
      img="success"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MessageModal from "@/components/MessageModal.vue";
import { useRoute } from "vue-router";
import { UpdateUserEmail } from "@/services/index";

const route = useRoute();
const params = ref(route.query);
const newEmail = ref(params.value.email);
const userId = ref(params.value.userId);

onMounted(async () => {
  UpdateUserEmail(newEmail, userId);
});
</script>
