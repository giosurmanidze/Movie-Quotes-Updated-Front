import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        lower_alpha_num: 'The {field} must contain only lowercase Latin characters and numbers'
      },
      names: {
        password_confirmation: 'confirm password'
      }
    },
    ka: {
      messages: {
        ...ka.messages,
        confirmed: 'პაროლები არ ემთხვევა ერთმანეთს',
        lower_alpha_num:
          '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს'
      },
      names: {
        name: 'სახელი',
        email: 'ელ-ფოსტა',
        password: 'პაროლი',
        password_confirmation: 'პაროლის გამეორება'
      }
    }
  })
})
