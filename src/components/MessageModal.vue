<template>
  <div
    class="fixed inset-0 flex items-start pt-28 justify-center xs:bg-message_modal_back_screen sm:bg-black sm:bg-opacity-60 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="modal-content py-8 max-w-[31.25rem] sm:px-16 xs:px-10 rounded-md shadow-lg flex flex-col gap-2 xs:w-[95%] max-h-90vh overflow-auto bg-gradient_dark sm:bg-main_bg_color"
      @click.stop
    >
      <div class="flex flex-col justify-center items-center gap-7 text-white h-[45vh]">
        <img v-if="img === 'success'" src="@/assets/success.svg" width="90" height="90" />
        <img
          v-if="img === 'emailSent'"
          src="@/assets/email-sent.svg"
          width="90"
          height="90"
        />
        <h1 class="text-3xl text-center">{{ $t(headerText) }}</h1>
        <p class="text-center w-full xs:text-base text-lg">
          {{ $t(msg) }}
        </p>
        <custom-button
          :text="props.btnText"
          :classes="props.classes"
          :route="props.route"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomButton from "@/components/CustomButton.vue";
import { defineProps } from "vue";

const props = defineProps({
  headerText: String,
  msg: String,
  btnText: String,
  classes: String,
  route: String,
  img: String,
});
</script>
