<template>
  <div
    class="modal-content py-8 sm:px-16 xs:px-10 rounded shadow-lg flex flex-col gap-2 xs:w-[95%] lg:w-[40%] max-h-90vh overflow-auto bg-[#222030]"
    @click.stop
  >
    <div class="flex flex-col justify-center items-center text-[#FFFFFF]">
      <h1 class="text-3xl">{{ $t('log_in_form_title') }}</h1>
      <span class="text-md text-[#6C757D] mt-1">{{ $t('log_in_form_header_text') }}</span>
    </div>
    <span class="text-center text-[#6C757D]"
      >{{ $t('log_in_footer_text')
      }}<span class="text-[#0D6EFD] underline ml-1" @click="showModal('login')">{{
        $t('sign_up')
      }}</span></span
    >
  </div>
</template>

<script setup>

const props = defineProps({
  showModal: {
    type: Function,
    requird: false
  }
})

</script>
