<template>
  <div class="flex flex-col gap-1 relative">
    <label :for="name" class="text-[#ffffff] text-base">
      {{ $t(label) }}<span class="text-[#DC3545] ml-1">*</span>
    </label>
    <Field
      :id="name"
      class="w-full pl-2 h-9 rounded-[4px] bg-[#CED4DA] outline-none"
      :class="{
        'border-2 border-red-500': hasError,
        'border-2 border-green-500': !hasError && hasInteracted
      }"
      :type="inputType"
      :rules="rules"
      :name="name"
      :placeholder="placeholder"
      :validate-on-input="true"
      @blur="hasInteracted = true"
      @input="hasInteracted = true"
    />
    <span v-if="!hasError && type !== 'password' && hasInteracted" class="absolute right-2 top-9">
      <img src="../assets/done-icon.svg" />
    </span>
    <span v-if="hasError && type !== 'password'" class="absolute right-2 top-9">
      <img src="../assets/error-icon.svg" />
    </span>
    <span
      v-if="type === 'password'"
      class="absolute right-2 top-[38px]"
      @click="togglePasswordVisibility"
    >
      <img v-if="!showPassword" src="../assets/hide-eye.svg" />
      <img v-else src="../assets/view-eye.svg" />
    </span>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { computed, defineProps, ref } from 'vue'

const hasInteracted = ref(false)
const showPassword = ref(false)

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  hasError: {
    type: String,
    required: false
  }
})

const inputType = computed(() => (showPassword.value ? 'text' : props.type))

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>
