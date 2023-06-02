import axiosInstance from '@/config/axios/index'

const sendRequest = async (url, data) => {
  await axiosInstance.get('/sanctum/csrf-cookie')
  try {
    const response = await axiosInstance.post(url, data)
    return response
  } catch (error) {
    throw error
  }
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
  await axiosInstance.get('/sanctum/csrf-cookie')
  try {
    const response = await axiosInstance.post('/api/logout')
    return response
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
