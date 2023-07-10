<template>
  <Field v-slot="{ meta }" name="thumbnail" v-model="fileModel">
    <label
      for="file"
      :class="[
        !meta.valid && meta.touched ? 'border-1 border-label_color' : '',
        meta.valid && meta.touched ? 'border-1  border-green_border' : '',
      ]"
      class="bg-modal_bg text-white h-[5.25rem] border border-white-1 px-2 items-center rounded-md hidden"
      @drop.prevent="dragFile"
      @dragover.prevent
    >
    </label>
    <input
      id="file"
      name="file"
      type="file"
      class="bg-modal_bg border border-white-1 hidden w-full h-full"
      @change="setImage"
    />
  </Field>
  <div class="relative w-full border border-white-1 min-h-20 rounded-lg">
    <img :src="src" alt="" class="w-auto h-auto" id="image" />
    <label
      for="file"
      class="cursor-pointer bg-black opacity-[0.6] w-[8.5rem] h-[5.25rem] flex flex-col items-center justify-center rounded-xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
    >
      <camera-icon />
      <p class="text-white text-[1rem] whitespace-nowrap">Change photo</p>
    </label>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";
import CameraIcon from "@/assets/icons/CameraIcon.vue";
const fileModel = ref(null);

defineProps(["src"]);

const setImage = function (event) {
  let output = document.getElementById("image");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
  fileModel.value = event.target.files[0];
};
</script>
