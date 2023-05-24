<template>
  <div
    class="modal-content py-8 sm:px-16 xs:px-10 rounded shadow-lg flex flex-col gap-2 w-[30%] max-h-90vh overflow-auto bg-[#222030]"
    @click.stop
  >
    <div class="flex flex-col justify-center items-center text-[#FFFFFF]">
      <h1 class="text-3xl">Log in to your account</h1>
      <span class="text-md text-[#6C757D]">Welcome back! Please enter your details.</span>
    </div>
    <Form @submit="submit">
      <div class="flex flex-col justify-between h-[35vh]">
        <TextField label="Email" type="text" name="email" />
        <TextField label="Password" type="text" name="password" />
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <Field id="remember" type="checkbox" name="remember" value="true" class="w-4 h-4" />
            <label for="remember" class="text-[#FFFFFF] text-base">Remember me</label>
          </div>
          <p class="text-[#0D6EFD] underline">Forgot password</p>
        </div>
        <Button type="submit" text="Sign in" classes="bg-[#E31221]" />
        <Button
          type="button"
          text="Sign in with Google"
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
import { Field, Form } from 'vee-validate'
import TextField from './TextField.vue'
import Button from './Button.vue'

const submit = (values) => {
  console.log(values)
}
</script>
