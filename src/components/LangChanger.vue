<template>
  <div class="xs:hidden sm:flex items-center gap-3">
    <select
      v-model="$i18n.locale"
      class="remove-arrow text-white"
      name="locale"
      @change="changeLocale"
      @click.stop
    >
      <option class="text-black" value="en">{{ $t("lang_choose_opt_en") }}</option>
      <option class="text-black" value="ka">{{ $t("lang_choose_opt_ka") }}</option>
    </select>
    <img src="@/assets/caret-right-fill.svg" class="mt-2" />
  </div>
</template>

<script setup>
import { setLocale } from "@vee-validate/i18n";

const changeLocale = (event) => {
  setLocale(event.target.value);
  localStorage.setItem("lang", event.target.value);
  event.stopPropagation();
};
if (localStorage.getItem("lang")) {
  setLocale(localStorage.getItem("lang"));
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
