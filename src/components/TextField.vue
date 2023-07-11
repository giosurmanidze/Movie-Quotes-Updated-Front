<template>
  <div class="flex flex-col gap-1 relative">
    <label :for="name" class="text-white xs:text-sm sm:text-base">
      {{ $t(label) }}<span class="text-label_color ml-1">*</span>
    </label>
    <Field
      :id="name"
      class="w-full pl-2 h-[2.375rem] xs:text-sm sm:text-md rounded bg-input_bg outline-none"
      :class="{
        'border-2 border-red_border': hasError,
        'border-2 border-green-500': !hasError && hasInteracted,
      }"
      :type="inputType"
      :rules="rules"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :validate-on-input="true"
      @blur="hasInteracted = true"
      @input="updateInput ? updateInput(name, $event.target.value) : null"
    />
    <ErrorMessage :name="name" class="text-label_color xs:text-sm sm:text-base" />
    <span v-if="!hasError && hasInteracted" class="absolute right-2 top-9">
      <img src="../assets/done-icon.svg" />
    </span>
    <span v-if="hasError" class="absolute right-2 top-9">
      <img src="../assets/error-icon.svg" />
    </span>
    <span
      v-if="type === 'password'"
      :class="`absolute right-2 top-[2.3rem] ${
        ((!hasError && hasInteracted) || hasError) && 'right-8'
      }`"
      @click="togglePasswordVisibility"
    >
      <hide-eye v-if="!showPassword" />
      <view-eye v-if="showPassword" />
    </span>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";
import { computed, defineProps, ref } from "vue";
import ViewEye from "@/assets/icons/ViewEye.vue";
import HideEye from "@/assets/icons/HideEye.vue";

const hasInteracted = ref(false);
const showPassword = ref(false);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  hasError: {
    type: String,
    required: false,
  },
  updateInput: {
    type: Function,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});
const inputType = computed(() => (showPassword.value ? "text" : props.type));
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>
