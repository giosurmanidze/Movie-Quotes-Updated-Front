import axios from '@/config/axios/index.js'

export async function getPosts() {
  if (this.searchValue) {
    const response = await axios.get(`api/quote-search`, {
      params: {
        search: this.searchValue
      }
    })
    this.posts = response.data
  } else {
    try {
      const response = await axios.get(`api/quotes`)
      this.posts = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
export function handleScroll() {
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    this.posts.length < this.totalPosts
  ) {
    this.getPosts()
  }
}
export async function refreshPosts() {
  try {
    const response = await axios.get(`api/quotes`)
    this.posts = response.data
  } catch (error) {
    console.log(error)
  }
}
export async function searchPosts() {
  if (this.searchValue === '') {
    this.refreshPosts()
  } else {
    try {
      const response = await axios.get(`api/quote-search`, {
        params: {
          search: this.searchValue
        }
      })
      this.posts = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
