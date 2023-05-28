import axiosInstance from '@/config/axios/index'

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/register', data)
    return response
  } catch (error) {
    throw error
  }
}
