<template>
  <div
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="props.onClick"
  >
    <div
      :class="
        showModal
          ? 'fixed inset-0 xs:bg-modal_bg bg-gray-900 sm:bg-opacity-75 transition-opacity'
          : ''
      "
    ></div>
    <div :class="showModal ? 'fixed inset-0 z-10 overflow-y-auto' : ''">
      <div class="flex min-h-full items-end justify-center text-center">
        <div
          @click.stop
          :class="showModal ? 'absolute xs:top-0 sm:top-8' : 'hidden'"
          class="transform max-w-3xl overflow-hidden bg-modal_bg text-left shadow-xl transition-all sm:my-8 sm:w-full md:w-2/3"
        >
          <section>
            <div
              class="flex justify-center items-center border-b border-modal_header_line py-5"
            >
              <slot name="header"></slot>
            </div>
            <div class="px-7 py-3">
              <slot name="body"> </slot>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable-next-line no-unused-vars -->
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  onClick: { required: false, type: Function },
  showModal: { type: Boolean, required: false },
});
</script>
