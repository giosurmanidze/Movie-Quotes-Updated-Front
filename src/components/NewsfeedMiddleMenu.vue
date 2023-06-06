<template>
  <div class="flex">
    <section class="flex text-white pl-6 md:pl-10">
      <button class="flex md:bg-[#24222F] p-2 rounded-md">
        <add-quote-modal />
        <div @click="toggleAddQuotesModal()" class="flex">
          <add-quote-icon />
          <p class="ml-2 text-base font-normal">{{ $t('write_new_quote') }}</p>
        </div>
      </button>
    </section>
    <section class="ml-5 text-[#a1a5a8] hidden md:block">
      <section class="flex p-2 border-b border-[#a1a5a8]">
        <Form @submit="submit" class="flex">
          <button><search-icon /></button>
          <search-input
            :placeholder="placeholderText"
            name="search"
            classes="ml-2 text-base bg-transparent lg:w-[400px]"
          />
        </Form>
      </section>
    </section>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import AddQuoteIcon from '@/assets/icons/AddQuote.vue'
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import AddQuoteModal from '@/components/AddQuoteModal.vue'
import SearchInput from '@/components/SearchInput.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/useModalStore'

const { t } = useI18n({ useScope: 'global' })

const store = useModalStore()

function toggleAddQuotesModal() {
  store.toggleAddQuotesModal()
}

const placeholderText = computed(() => {
  return (
    t('enter_to_search') +
    ' @ - ' +
    t('enter_to_search_two') +
    ' , ' +
    ' # - ' +
    t('enter_to_search_three')
  )
})

const submit = (values) => {
  console.log(values)
}
</script>
