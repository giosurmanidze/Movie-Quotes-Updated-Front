import axiosInstance from '@/config/axios/index'

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post('api/login', data)
    return response
  } catch (error) {
    throw error
  }
}
