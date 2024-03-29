import axios from '@/config/axios/index'
import { useAuthStore } from '@/stores/auth/useAuthStore.js'

const sendRequest = async (url, data) => {
  await axios.get('/sanctum/csrf-cookie')
  const response = await axios.post(url, data)
  return response
}

export const createUser = async (data) => {
  return sendRequest('api/register', data)
}
export const loginUser = async (data) => {
  return sendRequest('api/login', data)
}
export const sendForgotPassword = async (data) => {
  return sendRequest('api/forgot-password', data)
}
export const recoverPassword = async (data) => {
  return sendRequest('api/reset-password', data)
}

export const logoutUser = async () => {
  const authStore = useAuthStore()
  await axios.get('/sanctum/csrf-cookie')
  try {
    const response = await axios.post('/api/logout')
    authStore.authenticated = false
    return response
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const getUserData = async () => {
  await axios.get('/sanctum/csrf-cookie')
  return await axios.get('api/user')
}
