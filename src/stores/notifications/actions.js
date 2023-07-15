import axios from '@/config/axios/index.js'

export async function getNotifications() {
  try {
    const response = await axios.get(`api/get-notifications`)
    this.notifications = response.data
  } catch (error) {
    console.log(error)
  }
}
