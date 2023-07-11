<template>
  <Field
    :name="name"
    :rules="rules"
    :as="as"
    v-model="oldValue"
    v-slot="{ field }"
    class="flex"
    :validate-on-input="true"
  >
    <div class="flex">
      <template v-if="inputType === 'text'">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="mt-4 mb-1 py-2 px-2 border-gray-600 border rounded focus:outline-none w-full bg-transparent text-white placeholder-white"
        />
      </template>
      <template v-else-if="inputType === 'textarea'">
        <textarea
          v-bind="field"
          :placeholder="placeholder"
          class="mt-4 mb-1 py-2 px-2 xs:text-base sm:text-xl border-gray-600 border rounded focus:outline-none w-full bg-transparent text-white placeholder-white"
          :class="classes"
        ></textarea>
      </template>
      <p
        class="text-genre_text absolute right-10 md:right-10 mt-8 mr-3"
        :class="{
          'w-[1.125rem]': lang === 'en',
          'w-[1.25rem]': lang === 'ka',
        }"
      >
        <span v-if="lang === 'en'" :class="classes">Eng</span>
        <span v-if="lang === 'ka'" :class="classes">ქარ</span>
      </p>
    </div>
  </Field>
  <ErrorMessage class="text-red-300 mb-2" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps({
  name: { type: String, required: false },
  rules: { type: String, required: false },
  type: { type: String, required: false },
  lang: { type: String, required: false },
  placeholder: { type: String, required: false },
  oldValue: { type: String, required: false },
  as: { type: String, required: false },
  classes: { type: String, required: false },
  inputType: { type: String, required: false, default: "text" },
});

const oldValue = ref(props.oldValue);

watch(
  () => props.oldValue,
  (state) => {
    oldValue.value = state;
  }
);
</script>
