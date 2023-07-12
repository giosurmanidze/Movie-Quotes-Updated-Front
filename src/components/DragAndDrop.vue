<template>
  <Field v-slot="{ handleChange, meta }" :rules="rules" :name="name" v-model="fileModel">
    <div
      id="container"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop.prevent="dropFile"
      class="relative flex flex-row items-center gap-3 rounded-[0.25rem] border p-3 my-4"
      :class="[
        !meta.valid && meta.touched ? 'border-label_color' : '',
        meta.valid && meta.touched ? 'border-green_border' : '',
        dragging ? 'border-blue_border' : '',
      ]"
    >
      <div class="flex flex-row gap-3 break-words break-all">
        <CameraIcon />
        <p v-if="img">{{ img }}</p>
        <p v-else class="mt-1">{{ $t("drag_and_drop") }}</p>
      </div>
      <span
        class="cursor-pointer rounded-[0.24rem] bg-choose_img_btn p-[0.4rem] text-center"
        @click="getImage"
      >
        {{ $t("choose_file") }}
      </span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="absolute left-0 hidden h-full w-full"
        @change="handleChange"
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
const fileModel = ref(null);
const wasTouched = ref(false);
const dragging = ref(false);

watch(
  () => props.imgValue,
  (state) => {
    img.value = state;
  }
);

const getImage = () => {
  const fileInput = document.getElementById(props.name);
  if (fileInput) {
    fileInput.click();
  }
};
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
  if (!wasTouched.value) {
    wasTouched.value = true;
  }
  fileModel.value = e.dataTransfer.files[0];
  img.value = e.dataTransfer.files[0].name;
};
document.addEventListener("drop", dropFile);
</script>
