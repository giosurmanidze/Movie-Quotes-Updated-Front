import { defineRule } from 'vee-validate'
import { required, min, max, confirmed, email } from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('confirmed', confirmed)
defineRule('email', email)

defineRule('lower_alpha_num', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/^[a-z0-9]+$/.test(value)) {
    return false
  }
  return true
})
