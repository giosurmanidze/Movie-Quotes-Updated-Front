<template>
  <div class="flex-col">
    <label for="name" class="text-white">{{ $t(label) }}</label>
    <Field
      :name="name"
      v-slot="{ field }"
      :rules="rules"
      :modelValue="currentUser"
      @update:modelValue="currentUser = $event"
      :validateOnInput="true"
    >
      <div class="relative text-black my-2">
        <input
          :disabled="disabled"
          :type="inputType"
          v-bind="field"
          class="bg-quote_text p-1.5 w-full rounded smth"
          :class="[verified ? verifiedStyles : nonVerifiedStyles, classes]"
        />
        <TickIcon v-if="verified" class="absolute top-3 right-2" />
        <WarningIcon v-if="warning" class="absolute top-3 right-2" />
        <span
          v-if="type === 'password'"
          class="absolute right-2 top-[0.585rem]"
          @click="togglePasswordVisibility"
        >
          <hide-eye v-if="!showPassword" />
          <view-eye v-if="showPassword" />
        </span>
      </div>
    </Field>
    <ErrorMessage class="text-red-300" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { computed, ref, defineProps } from "vue";
import TickIcon from "@/assets/icons/TickIcon.vue";
import WarningIcon from "@/assets/icons/WarningIcon.vue";
import ViewEye from "@/assets/icons/ViewEye.vue";
import HideEye from "@/assets/icons/HideEye.vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  rules: { type: String, required: false },
  currentUser: { type: String, required: false },
  bgColor: { type: String, required: false },
  verified: { type: Boolean, required: false },
  warning: { type: Boolean, required: false },
  type: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  classes: { type: String, required: false },
});

const showPassword = ref(false);

const verifiedStyles = computed(() => {
  return props.verified ? "outline outline-[#198754] bg-green-bg text-white" : "";
});

const nonVerifiedStyles = computed(() => {
  return props.warning ? "outline outline-[#EC9524] bg-orange-bg text-white" : "";
});

const inputType = computed(() => (showPassword.value ? "text" : props.type));
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>
