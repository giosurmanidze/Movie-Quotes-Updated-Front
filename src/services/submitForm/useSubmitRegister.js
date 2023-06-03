import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '../requests/sendRequest'
import { useI18n } from 'vue-i18n'

export default function useSubmitRegister() {
  const loading = ref(false)
  const router = useRouter()
  const { locale } = useI18n({ useScope: 'global' })

  const submit = async (values, actions) => {
    loading.value = true

    try {
      await createUser(values)
      loading.value = false
      router.push({
        name: 'sentEmail'
      })
    } catch (error) {
      loading.value = false
      const errors = error.response?.data.errors
      for (const key in errors) {
        actions.setFieldError(key, errors[key][0][locale.value])
      }
    }
  }

  return {
    submit,
    loading
  }
}
