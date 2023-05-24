<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-[#ffffff] text-base"
      >{{ label }}<span class="text-[#DC3545] ml-1">*</span></label
    >
    <Field
      :type="type"
      class="w-full pl-2 h-9 rounded-[4px] bg-[#CED4DA]"
      :name="name"
      :id="name"
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
  name: {
    type: String,
    required: true
  }
})
</script>
