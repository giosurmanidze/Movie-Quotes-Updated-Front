import axiosInstance from '@/config/axios/index'

const sendRequest = async (url, data) => {
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
