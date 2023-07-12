import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { recoverPassword, createUser, sendForgotPassword } from './requests/sendRequest'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/useModalStore'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { usePostStore } from '@/stores/posts'
import { useProfilePageStore } from '@/stores/useProfilePageStore'
import { useUserStore } from '@/stores/useUserStore'
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
    console.log(values)

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
      release_date: values.releaseDate,
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
        errorMessage.value = error.response.data.message
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
    console.log(values)
    let data = {
      name_en: values.nameEn,
      name_ka: values.nameKa,
      genre: JSON.stringify(genreIds),
      director_en: values.directorEn,
      director_ka: values.directorKa,
      description_en: values.descriptionEn,
      description_ka: values.descriptionKa,
      budget: values.budget,
      release_date: values.releaseDate,
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
  const { getQuotesRefresh, getQuote } = useQuotesStore()
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

export function handleQuoteLike(quoteId, likeable, likeId) {
  likeable.value = !likeable.value
  const { getQuote, getQuotesRefresh } = useQuotesStore()
  const { refreshPosts } = usePostStore()

  let data = {
    quote_id: quoteId
  }

  if (likeable.value) {
    axios
      .delete(`api/likes/${likeId.value}`)
      .then(() => {
        likeId.value = null
        getQuote(quoteId)
        getQuotesRefresh()
        refreshPosts()
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    axios
      .post('api/likes', data)
      .then((response) => {
        likeId.value = response.data.like_id
        getQuote(quoteId)
        getQuotesRefresh()
        refreshPosts()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function useSendProfileAvatar(showUserUpdatedAlert, showSaveChangesButtons) {
  const { getUser } = useUserStore()

  const sendThumbnailData = () => {
    showUserUpdatedAlert.value = false
    const fileInput = document.getElementById('getFile')
    const file = fileInput.files[0]

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    axios
      .post('api/user/update', { thumbnail: file }, config)
      .then(() => {
        getUser()
        showUserUpdatedAlert.value = true
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
    console.log(values.username)

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
  showUserUpdatedAlert,
  ShowEmailSentAlert,
  disableInput,
  disableInputForEmail,
  showSaveChangesButtons,
  usernameErrors,
  showEditPassword,
  sendUserName,
  sendEmail,
  emailErrors
) {
  const { getUser } = useUserStore()
  const { locale } = useI18n({ useScope: 'global' })
  const { setShowValue } = useProfilePageStore()

  function submit(values) {
    showUserUpdatedAlert.value = false

    const fileInput = document.getElementById('getFile')
    const file = fileInput.files[0]

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
        setShowValue(true)
        if (sendUserName.value) {
          showUserUpdatedAlert.value = true
          sendUserName.value = false
          disableInput.value = true
          showSaveChangesButtons.value = false
          usernameErrors.value = null
        }
        if (userData.thumbnail) {
          showSaveChangesButtons.value = false
          showUserUpdatedAlert.value = true
        }
        if (userData.password) {
          showSaveChangesButtons.value = false
          showUserUpdatedAlert.value = true
          showEditPassword.value = true
        }
      })
      .catch((error) => {
        usernameErrors.value = error.response.data.errors.username
          ? error.response.data.errors.username[0][locale.value]
          : null
      })

    if (sendEmail?.value) {
      axios
        .post('api/user/add-email', { email: values.email })
        .then(() => {
          getUser()
          ShowEmailSentAlert.value = true
          disableInputForEmail.value = true
          sendEmail.value = false
          showSaveChangesButtons.value = false
          emailErrors.value = null
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
