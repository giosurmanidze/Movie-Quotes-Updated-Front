import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendForgotPassword } from '../requests/sendRequest'
import { useI18n } from 'vue-i18n'

export default function useSubmitForgotPassword() {
  const router = useRouter()
  const loading = ref(false)
  const { locale } = useI18n({ useScope: 'global' })

  const submit = async (values) => {
    loading.value = true

    try {
      await sendForgotPassword(values)
      loading.value = false
      router.push({
        name: 'recoverInstructions'
      })
    } catch (error) {
      loading.value = false
      // console.log(error.response.data.errors.email[0][locale.value])
      // actions.setFieldError('email', error.response.data.errors.email[0][locale.value])
    }
  }

  return {
    submit,
    loading
  }
}
