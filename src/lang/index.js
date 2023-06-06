import { createI18n } from 'vue-i18n'
import * as landingEn from './en/landing.json'
import * as landingKa from './ka/landing.json'
import * as authEn from './en/auth.json'
import * as authka from './ka/auth.json'
import * as dialogsEn from './en/dialogs.json'
import * as dialogsKa from './ka/dialogs.json'
import * as newsFeedEn from './en/newsFeed.json'
import * as newsFeedKa from './ka/newsFeed.json'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {
      ...landingEn,
      ...authEn,
      ...dialogsEn,
      ...newsFeedEn
    },
    ka: {
      ...landingKa,
      ...authka,
      ...dialogsKa,
      ...newsFeedKa
    }
  }
})

export default i18n
