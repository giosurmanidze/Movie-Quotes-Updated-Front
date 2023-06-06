<template>
  <Field :name="name" :rules="rules" :as="as" v-model="oldValue" v-slot="{ field }" class="flex">
    <div class="flex">
      <input
        v-bind="field"
        :placeholder="placeholder"
        :type="type"
        class="mt-4 mb-1 placeholder-white py-2 px-2 border-gray-600 border rounded focus:outline-none w-full bg-transparent"
      />
      <p
        class="text-[#6C757D] absolute right-10 md:right-10 mt-6"
        :class="{
          'w-[18px]': lang === 'en',
          'w-[21px]': lang === 'ka'
        }"
      >
        <span v-if="lang === 'en'">En</span>
        <span v-if="lang === 'ka'">Ka</span>
      </p>
    </div>
  </Field>
  <error-message class="text-red-300 mb-2" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, required: false },
  type: { type: String, required: false },
  lang: { type: String, required: false },
  placeholder: { type: String, required: false },
  oldValue: { type: String, required: false },
  as: { type: String, required: false }
})

const oldValue = ref(props.oldValue)

watch(
  () => props.oldValue,
  (state) => {
    oldValue.value = state
  }
)
</script>
