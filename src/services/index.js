import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { recoverPassword, createUser, sendForgotPassword } from './requests/sendRequest'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/modal/useModalStore.js'
import { useMoviesStore } from '@/stores/movies/useMoviesStore'
import { useQuotesStore } from '@/stores/quotes/useQuotesStore'
import { usePostStore } from '@/stores/posts/posts'
import { useProfilePageStore } from '@/stores/profile/useProfilePageStore'
import { useUserStore } from '@/stores/user/useUserStore'
import axios from '@/config/axios/auth-index'

export function useSubmitCreatePassword() {
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)

  const submit = async (values) => {
    loading.value = true

    try {
      values.email = route.query.email
      values.token = route.query.token
      await recoverPassword(values)
      loading.value = false
      router.push({
        name: 'changedPassword'
      })
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  }

  return {
    submit,
    loading
  }
}

export function useSubmitForgotPassword() {
  const { locale } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const loading = ref(false)

  const submit = async (values, actions) => {
    loading.value = true
    try {
      await sendForgotPassword(values)
      loading.value = false
      router.push({
        name: 'recoverInstructions'
      })
    } catch (error) {
      loading.value = false
      actions.setFieldError('email', error.response.data.errors.email[0][locale.value])
    }
  }

  return {
    submit,
    loading
  }
}

export function useCreateMovie(genres) {
  const store = useModalStore()
  const moviesStore = useMoviesStore()
  const imgValue = ref(true)
  const errorMessage = ref('')

  function submit(values, { resetForm }) {
    errorMessage.value = ''
    imgValue.value = true
    let genreIds = genres.value.map((genre) => genre.id)

    let data = {
      name_en: values.nameEn,
      name_ka: values.nameKa,
      genre: JSON.stringify(genreIds),
      director_en: values.directorEn,
      director_ka: values.directorKa,
      description_en: values.descriptionEn,
      description_ka: values.descriptionKa,
      budget: values.budget,
      release_date: values.year,
      thumbnail: values.thumbnail
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios
      .post('api/movies', data, config)
      .then((response) => {
        store.toggleAddMoviesModal()
        store.toggleMovieAddedModal()
        moviesStore.movies.unshift(response.data)
        resetForm()
        imgValue.value = false
      })
      .catch((error) => {
        errorMessage.value = error.response.data?.message
      })
  }

  return {
    submit,
    imgValue,
    errorMessage
  }
}

export function useCreateQuote() {
  const quotesStore = useQuotesStore()
  const imgValue = ref(true)
  const store = useModalStore()
  const { getQuotesRefresh } = useQuotesStore()
  const { refreshPosts } = usePostStore()

  function submit(values, { resetForm }) {
    imgValue.value = true
    let data = {
      body_en: values.bodyEn,
      body_ka: values.bodyKa,
      thumbnail: values.thumbnail,
      movie_id: values.movie
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    axios
      .post('api/quotes', data, config)
      .then((response) => {
        store.toggleAddQuotesModal()
        store.toggleQuoteAddedModal()
        quotesStore.quotes.unshift(response.data)
        getQuotesRefresh()
        refreshPosts()
        resetForm()
        imgValue.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    submit,
    imgValue
  }
}

export function fetchMovie(params) {
  const router = useRouter()
  const moviesStore = useMoviesStore()
  const movie = ref()
  moviesStore.edited = false

  axios
    .get(`api/movies/${params.value}`)
    .then((response) => {
      movie.value = response.data
      moviesStore.quotes = response.data.quotes
    })
    .catch(() => {
      router.back()
    })

  return {
    movie
  }
}

export function useSubmitRegister() {
  const { locale } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const loading = ref(false)

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

export function useEditMovie(params, genres) {
  const { updatedMovie } = useMoviesStore()
  const store = useModalStore()

  function submit(values) {
    let genreIds = genres.value.map((genre) => genre.id)
    let data = {
      name_en: values.nameEn,
      name_ka: values.nameKa,
      genre: JSON.stringify(genreIds),
      director_en: values.directorEn,
      director_ka: values.directorKa,
      description_en: values.descriptionEn,
      description_ka: values.descriptionKa,
      budget: values.budget,
      release_date: values.year,
      thumbnail: values.thumbnail1
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    axios
      .post(`api/movies/${params.value}`, data, config)
      .then((response) => {
        updatedMovie.value = response.data
        store.toggleEditModal(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    submit
  }
}
export function useEditQuote(quote) {
  const successMessage = ref(null)
  const moviesStore = useMoviesStore()
  function submit(values) {
    let data = {
      body_en: values.bodyEn,
      body_ka: values.bodyKa,
      thumbnail: values.thumbnail
    }
    const quoteId = ref(quote.value.id)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios
      .post(`api/quotes/${quoteId.value}`, data, config)
      .then(() => {
        successMessage.value = true
        moviesStore.edited = true
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    submit,
    successMessage
  }
}

export function useCreateComment(quoteId) {
  const store = useModalStore()
  const { getQuotesRefresh } = useQuotesStore()
  const { refreshPosts } = usePostStore()

  function submit(values, actions) {
    let data = {
      quote_id: quoteId.value,
      body: values.comment
    }
    axios
      .post('api/comments', data)
      .then(() => {
        actions.resetForm()
        store.toggleCommentAddedModal()
        getQuotesRefresh()
        refreshPosts()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    submit
  }
}

export async function handleQuoteLike(quoteId, likeable, likeId) {
  const previousValue = likeable.value
  likeable.value = !likeable.value
  const { getQuote, getQuotesRefresh } = useQuotesStore()
  const { refreshPosts } = usePostStore()

  let data = {
    quote_id: quoteId
  }

  try {
    if (likeable.value) {
      await axios.delete(`api/likes/${likeId.value}`)
      likeId.value = null
    } else {
      const response = await axios.post('api/likes', data)
      likeId.value = response.data.like_id
    }
    getQuote(quoteId)
    getQuotesRefresh()
    refreshPosts()
  } catch (error) {
    console.log(error)
    likeable.value = previousValue
  }
}

export function useSendProfileAvatar(showSaveChangesButtons) {
  const { getUser } = useUserStore()

  const { toggleShowAvatarAlert } = useProfilePageStore()

  const sendThumbnailData = (values) => {
    const fileInput = document.getElementById('getFile')
    const file = fileInput.files[0]

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const data = {
      thumbnail: file ? file : values.avatar
    }
    axios
      .post('api/user/update', data, config)
      .then(() => {
        getUser()
        toggleShowAvatarAlert(true)
        showSaveChangesButtons.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    sendThumbnailData
  }
}

export function useSendUsername(showUserUpdated, disableInput, showConfirmModal, usernameError) {
  const { getUser } = useUserStore()
  const { locale } = useI18n({ useScope: 'global' })

  function sendData(values) {
    showUserUpdated.value = false

    axios
      .post('api/user/update', { username: values.username })
      .then(() => {
        getUser()
        disableInput.value = true
        showConfirmModal.value = false
        showUserUpdated.value = true
      })
      .catch((error) => {
        disableInput.value = false
        showConfirmModal.value = false
        usernameError.value = error.response.data.errors.username[0][locale.value]
      })
  }

  return {
    sendData
  }
}

export function useUpdateUserData(
  disableInput,
  disableInputForEmail,
  showSaveChangesButtons,
  usernameErrors,
  showEditPassword,
  sendUserName,
  sendEmail,
  emailErrors,
  sendAvatar
) {
  const { getUser } = useUserStore()
  const { locale } = useI18n({ useScope: 'global' })
  const {
    toggleShowUsernameAlert,
    toggleShowEmailAlert,
    toggleShowPassowrdAlert,
    toggleShowAvatarAlert
  } = useProfilePageStore()

  function submit(values) {
    toggleShowUsernameAlert(false)
    toggleShowEmailAlert(false)
    toggleShowPassowrdAlert(false)
    toggleShowAvatarAlert(false)


    let fileInput = document.getElementById('getFile')
    const file = fileInput?.files[0]

    const userData = {
      username: sendUserName.value ? values.username : null,
      password: values.password,
      thumbnail: file
    }
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios
      .post('api/user/update', userData, config)
      .then(() => {
        getUser()
        if (sendUserName.value) {
          toggleShowUsernameAlert(true)
          sendUserName.value = false
          disableInput.value = true
          showSaveChangesButtons.value = false
          usernameErrors.value = null
        }
        if (sendAvatar.value) {
          showSaveChangesButtons.value = false
          toggleShowAvatarAlert(true)
          sendAvatar.value = false
        }
        if (userData.password) {
          showSaveChangesButtons.value = false
          showEditPassword.value = true
          toggleShowPassowrdAlert(true)
        }
      })
      .catch((error) => {
        usernameErrors.value = error.response.data.errors.username
          ? error.response.data.errors.username[0][locale.value]
          : null
      })

    if (sendEmail?.value) {
      console.log(values)
      axios
        .post('api/user/add-email', { email: values.new_email })
        .then(() => {
          disableInputForEmail.value = true
          toggleShowEmailAlert(true)
          sendEmail.value = false
          showSaveChangesButtons.value = false
          emailErrors.value = null
          getUser()
        })
        .catch((error) => {
          emailErrors.value = error.response.data.errors.email[0][locale.value]
        })
    }
  }
  return {
    submit
  }
}

export async function UpdateUserEmail(newEmail, userId) {
  try {
    const response = await axios.post(`api/confirm-account/${userId.value}`, {
      email: newEmail.value
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export function userPassowrdUsernameUpdate(fieldName, data, updatedModal, showConfirmModal) {
  const errorMessage = ref(null)
  const profileStore = useProfilePageStore()
  const { getUser } = useUserStore()
  const { locale } = useI18n({ useScope: 'global' })


  function sendData() {
    axios
      .post('api/user/update', { [fieldName]: data.value })
      .then(() => {
        profileStore.toggleShowForm(true)
        profileStore.toggleShowModal(true)
        profileStore.toggleUsernameEdited(true)
        showConfirmModal.value = true
        updatedModal(true)
        errorMessage.value = ''
        getUser()
      })
      .catch((error) => {
        showConfirmModal.value = false
        errorMessage.value = error.response.data.errors?.username[0][locale.value]
      })
  }

  return {
    sendData,
    errorMessage
  }
}

export function sendEmail(changedEmail, showConfirmModal) {
  const { locale } = useI18n({ useScope: 'global' })
  const errorMessage = ref(null)
  const { toggleShowEmailAlert } = useProfilePageStore()
  const profileStore = useProfilePageStore()
  const { getUser } = useUserStore()
  function sendData() {
    axios
      .post('api/user/add-email', { email: changedEmail.value })
      .then(() => {
        toggleShowEmailAlert(true)
        profileStore.toggleShowForm(true)
        profileStore.toggleShowModal(true)
        errorMessage.value = null
        getUser()
      })
      .catch((error) => {
        showConfirmModal.value = false
        errorMessage.value = error.response.data.errors.email[0][locale.value]
      })
  }

  return {
    sendData,
    errorMessage
  }
}
