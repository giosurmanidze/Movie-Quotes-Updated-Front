<template>
  <Field v-slot="{ meta }" name="thumbnail" v-model="fileModel">
    <label
      for="file"
      :class="[
        'border-1',
        meta.touched ? (meta.valid ? 'border-green_border' : 'border-label_color') : '',
      ]"
      class="bg-modal_bg text-white h-[5.25rem] border border-white-1 px-2 items-center rounded-md hidden"
      @drop.prevent="dropFile"
      @dragover.prevent
    ></label>
    <input
      id="file"
      name="file"
      type="file"
      class="bg-modal_bg border border-white-1 hidden w-full h-full"
      @change="setImage"
    />
  </Field>
  <div
    class="relative border border-white-1 rounded-lg w-auto h-auto md:flex items-center"
    id="container"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="dropFile"
  >
    <div class="relative border border-white-1 rounded-lg w-auto h-auto md:w-full">
      <img
        :src="selectedImage ? createObjectURL(selectedImage) : src"
        alt=""
        class="w-full"
        id="image"
      />
      <label
        for="file"
        class="cursor-pointer bg-black opacity-[0.6] w-[8.5rem] h-[5.25rem] flex flex-col items-center justify-center rounded-xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
      >
        <camera-icon />
        <p class="text-white text-[1rem] whitespace-nowrap">{{ $t("change_photo") }}</p>
      </label>
    </div>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";
import CameraIcon from "@/assets/icons/CameraIcon.vue";

const fileModel = ref(null);
const selectedImage = ref(null);
const props = defineProps({
  src: { type: String },
  getNewImage: { type: Function },
});

const dragging = ref(false);

const dragOver = (e) => {
  e.preventDefault();
  dragging.value = true;
};

const dragLeave = (e) => {
  e.preventDefault();
  dragging.value = false;
};

const dropFile = (e) => {
  e.preventDefault();
  dragging.value = false;
  selectedImage.value = e.dataTransfer.files[0];
  props.getNewImage(selectedImage.value);
};

document.addEventListener("drop", dropFile);

const createObjectURL = (file) => {
  if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
    return URL.createObjectURL(file);
  } else {
    return "";
  }
};
const setImage = function (event) {
  const output = document.getElementById("image");
  output.src = createObjectURL(event.target.files[0]);
  selectedImage.value = event.target.files[0];
  props.getNewImage(selectedImage.value);
};
</script>
