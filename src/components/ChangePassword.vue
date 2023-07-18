<template>
  <Form @submit="submitHandler">
    <div>
      <div v-if="$route.name === 'changePassword'">
        <section class="bg-modal_bg px-4 py-3">
          <p>{{ $t("passwords_should_contain") }}:</p>
          <ul class="px-4 py-3 list-disc">
            <li
              :class="{
                'text-white': eightOrMoreCharacters,
                'text-genre_text': !eightOrMoreCharacters,
              }"
              class="text-sm"
            >
              {{ $t("eight_or_more_characters") }}
            </li>
            <li
              :class="{
                'text-white': lessThan15Characters,
                'text-genre_text': !lessThan15Characters,
              }"
              class="text-sm"
            >
              {{ $t("less_than_15_characters") }}
            </li>
          </ul>
        </section>
        <section class="text-black flex flex-col relative mt-4">
          <ProfileInput
            name="password"
            rules="required|alpha_num|min:8|max:15"
            type="password"
            label="password"
            @input="password = $event.target.value"
          />
          <br />
          <ProfileInput
            name="password_confirmation"
            type="password"
            rules="required|confirmed:password"
            label="conf_password"
          />
          <section class="flex justify-between text-white pt-5">
            <div @click="$router.push({ name: 'userProfile' })" class="py-2 px-1">
              {{ $t("cancel") }}
            </div>
            <button class="bg-red-600 rounded px-5 py-2">
              {{ $t("edit") }}
            </button>
          </section>
        </section>
      </div>
    </div>
  </Form>
</template>

<script setup>
import ProfileInput from "./ProfileInput.vue";
import { ref, watch } from "vue";
import { Form } from "vee-validate";
import { useRouter } from "vue-router";

const password = ref("");
const eightOrMoreCharacters = ref(false);
const lessThan15Characters = ref(false);
const router = useRouter();

watch(password, (newValue) => {
  eightOrMoreCharacters.value = newValue.length >= 8;
  lessThan15Characters.value = newValue.length < 15 && newValue.length > 1;
});

function submitHandler(values) {
  router.push({ name: "youSure", query: { passowrd: values.password } });
}
</script>
