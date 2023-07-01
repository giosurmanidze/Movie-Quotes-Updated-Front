<template>
  <Field v-slot="{ handleChange, meta }" :rules="rules" :name="name" v-model="fileModel">
    <div
      id="container"
      @drop.prevent="dragFile"
      @dragover.prevent
      class="relative flex flex-row items-center gap-3 rounded-[0.25rem] border p-3 my-4"
      :class="[
        !meta.valid && meta.touched ? 'border-label_color' : '',
        meta.valid && meta.touched ? 'border-green_border' : '',
      ]"
    >
      <div class="flex flex-row gap-3 break-words break-all">
        <camera-icon />
        <p v-if="img">{{ img }}</p>
        <p v-else class="mt-1">{{ $t("drag_and_drop") }}</p>
      </div>
      <span
        class="cursor-pointer rounded-[0.24rem] bg-choose_img_btn p-[0.4rem]"
        @click="getImage"
      >
        {{ $t("choose_file") }}
      </span>
      <input
        type="file"
        accept="image/*"
        class="absolute left-0 hidden h-full w-full"
        @change="handleChange"
        @input="setImage"
        :id="name"
      />
    </div>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";
import CameraIcon from "@/assets/icons/CameraIcon.vue";
import { ref, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: "file",
  },
  rules: {
    type: String,
    required: false,
    default: "required",
  },
  imgValue: {
    type: Boolean,
    required: false,
  },
});
const img = ref("");

watch(
  () => props.imgValue,
  (state) => {
    img.value = state;
  }
);

const fileModel = ref(null);
const wastouched = ref(false);
const getImage = () => {
  document.getElementById(props.name).click();
};
const setImage = (e) => {
  if (!wastouched.value) wastouched.value = true;
  fileModel.value = e.target.files[0];
  document.getElementById("container").classList.add("border-[#198754]");
  img.value = e.target.files.length !== 0 ? e.target.files[0].name : img.value;
};

const dragFile = (e) => {
  if (!wastouched.value) wastouched.value = true;
  fileModel.value = e.dataTransfer.files[0];
  img.value = e.dataTransfer.files[0].name;
};
</script>
