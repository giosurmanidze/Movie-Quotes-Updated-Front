import { createI18n } from 'vue-i18n'
import * as landingEn from './en/landing.json'
import * as landingKa from './ka/landing.json'
import * as authEn from './en/auth.json'
import * as authka from './ka/auth.json'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {
      ...landingEn,
      ...authEn
    },
    ka: {
      ...landingKa,
      ...authka
    }
  }
})

export default i18n
