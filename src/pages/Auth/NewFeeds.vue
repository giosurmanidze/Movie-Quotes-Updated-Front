<template>
  <form method="post" @submit.prevent="logout">
    <button type="submit">Log out</button>
  </form>
</template>

<script setup>
import axiosInstance from '../../config/axios/index'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await axiosInstance.get('/sanctum/csrf-cookie')
  try {
    await axiosInstance.post('/api/logout')
    router.push({ name: 'landing' })
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>
