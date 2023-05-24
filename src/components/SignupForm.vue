<template>
  <div
    class="modal-content py-8 sm:px-16 xs:px-10 rounded shadow-lg flex flex-col gap-4 w-[95%] max-h-90vh overflow-auto bg-[#222030]"
    @click.stop
  >
    <div class="flex flex-col justify-center items-center text-[#FFFFFF]">
      <h1 class="text-3xl">Create an account</h1>
      <span class="text-md text-[#6C757D]">Start your journey!</span>
    </div>
    <Form @submit="submit">
      <div class="flex flex-col justify-between gap-4 h-[55vh]">
        <TextField label="Name" type="text" name="name" />
        <TextField label="Email" type="text" name="email" />
        <TextField label="Password" type="text" name="password" />
        <TextField label="Confirm password" type="text" name="password_confirmation" />
        <Button type="submit" text="get_started" classes="bg-[#E31221]" />
        <Button
          type="button"
          text="sign_up_o"
          classes="flex justify-center items-center gap-3 border-2 pb-1 border-[#ffffff]"
          :show-icon="true"
        />
      </div>
    </Form>
    <span class="text-center text-[#6C757D]"
      >Already have an account?<span class="text-[#0D6EFD] underline ml-1">Log in</span></span
    >
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import TextField from './TextField.vue'
import Button from './Button.vue'

const submit = (values) => {
  console.log(values)
}
</script>
