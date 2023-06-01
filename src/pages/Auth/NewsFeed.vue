<template>
  <form method="post" @submit.prevent="logout">
    <button type="submit">Log out</button>
  </form>
</template>

<script setup>
import { logoutUser } from '../../services/sendRequest'
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = async () => {
  try {
    await logoutUser()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>
