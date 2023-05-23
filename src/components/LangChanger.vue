<template>
  <div class="xs:hidden sm:flex items-center gap-2 justify-between" :class="classes">
    <select
      v-model="$i18n.locale"
      class="remove-arrow text-white"
      name="locale"
      @change="changeLocale"
      @click.stop
    >
      <option class="text-black" value="en">Eng</option>
      <option class="text-black" value="ka">ქარ</option>
    </select>
    <img src="../assets/caret-right-fill.svg" />
  </div>
</template>

<script setup>
import { setLocale } from '@vee-validate/i18n'

const props = defineProps({
  classes: { type: String, required: false }
})
const changeLocale = (event) => {
  setLocale(event.target.value)
  localStorage.setItem('lang', event.target.value)
}
if (localStorage.getItem('lang')) {
  setLocale(localStorage.getItem('lang'))
}
</script>

<style scoped>
.remove-arrow {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>
