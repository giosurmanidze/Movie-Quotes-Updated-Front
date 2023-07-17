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
        en: 'The {field} must contain english letters',
        geo: 'The {field} must contain georgian letters',
        confirm_password: 'passwords must match'
      },
      names: {
        bodyEn: 'quote',
        new_email:'New email',
        bodyKa: 'quote',
        nameKa: 'name field',
        nameEn: 'name field',
        directorKa: 'director field',
        directorEn: 'director field',
        genreEn: 'genre field',
        genreKa: 'genre field',
        confirm_password: 'passwords must match',
        descriptionEn: 'description field',
        descriptionKa: 'description field',
        password_confirmation: 'confirm password'
      }
    },
    ka: {
      messages: {
        ...ka.messages,
        confirmed: 'პაროლები არ ემთხვევა ერთმანეთს',
        lower_alpha_num:
          '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს',
        geo: '{field} უნდა შეიცავდეს ქართულ ასოებს',
        en: '{field} უნდა შეიცავდეს ინგლისურ ასოებს',
        confirm_password: '{field} უნდა ემთხვეოდეს პაროლს'
      },
      names: {
        username: 'სახელი',
        movie: 'ფილმის არჩევა',
        email: 'ელ-ფოსტა',
        new_email:'ახაილი მეილი',
        password: 'პაროლი',
        password_confirmation: 'პაროლის გამეორება',
        confirm_password: 'განმეორებით პაროლი',
        bodyEn: 'ველი',
        bodyKa: 'ველი',
        nameKa: 'სახელის ველი',
        nameEn: 'სახელის ველი',
        directorEn: 'რეჟისორის ველი',
        directorKa: 'რეჟისორის ველი',
        genreEn: 'ჟანრის ველი',
        genreKa: 'ჟანრის ველი',
        descriptionEn: 'აღწერის ველი',
        descriptionKa: 'აღწერის ველი',
        name: 'მომხმარებლის სახელი',
        budget:"ბიუჯეტი",
        year:'გამოშვების წელი'
      }
    }
  })
})
