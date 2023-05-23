import { createI18n } from 'vue-i18n'
import * as landingEn from './en/landing.json'
import * as landingKa from './ka/landing.json'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {
      ...landingEn
    },
    ka: {
      ...landingKa
    }
  }
})

export default i18n
