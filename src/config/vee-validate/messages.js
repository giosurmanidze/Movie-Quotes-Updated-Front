import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        lower_alpha_num: 'The {field} must contain only lowercase Latin characters and numbers',
        en: "{field} must contain english letters",
      },
      names: {
        bodyEn: "field",
        bodyKa: "field",
        nameKa: "name field",
        nameEn: "name field",
        directorKa: "director field",
        directorEn: "director field",
        genreEn: "genre field",
        genreKa: "genre field",
        descriptionEn: "description field",
        descriptionKa: "description field",
        password_confirmation: 'confirm password'
      }
    },
    ka: {
      messages: {
        ...ka.messages,
        confirmed: 'პაროლები არ ემთხვევა ერთმანეთს',
        lower_alpha_num:
          '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს',
        geo: "{field} უნდა შეიცავდეს ქართულ ასოებს",
        },
      names: {
        username: 'სახელი',
        email: 'ელ-ფოსტა',
        password: 'პაროლი',
        password_confirmation: 'პაროლის გამეორება',
        bodyEn: "field",
        bodyKa: "ველი",
        nameKa: "სახელის ველი",
        nameEn: "name field",
        directorEn: "director field",
        directorKa: "რეჟისორის ველი",
        genreEn: "genre field",
        genreKa: "ჟანრის ველი",
        descriptionEn: "description field",
        descriptionKa: "აღწერის ველი",
        name: "მომხმარებლის სახელი",
      }
    }
  })
})
