<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-[#ffffff] text-base"
      >{{ $t(label) }}<span class="text-[#DC3545] ml-1">*</span></label
    >
    <Field
      :id="name"
      class="w-full pl-2 h-9 rounded-[4px] bg-[#CED4DA]"
      :type="type"
      :rules="rules"
      :name="name"
      :validate-on-input="true"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { defineProps } from 'vue'

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
  }
})
</script>
