import { defineRule } from 'vee-validate'
import { required, min, max, alpha_num,confirmed, email } from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha_num', alpha_num)
defineRule('email', email)
defineRule("confirmed", confirmed);


defineRule('lower_alpha_num', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/^[a-z0-9]+$/.test(value)) {
    return false
  }
  return true
})
defineRule('lowercase', (value) => {
  const regex = /^[a-z0-9.@]*$/
  if (!regex.test(value)) {
    return false
  }
  return true
})

defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return 'passwords must match'
})

defineRule('geo', (value) => {
  const regex = /^[ა-ჰა-ჰ0-9-_\';?!:.,"\s]*$/
  if (!regex.test(value)) {
    return false
  }
  return true
})

defineRule('en', (value) => {
  const regex = /^[a-zA-Z0-9-_\';?!:.,"\s]*$/
  if (!regex.test(value)) {
    return false
  }
  return true
})
