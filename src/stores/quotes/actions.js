import axios from '@/config/axios/auth-index'

export function getQuotes() {
  if (this.loading || this.quotes.length > 0) {
    return
  }
  this.loading = true
  axios.get('api/quotes?page=' + this.page++).then((response) => {
    this.quotes.push(...response.data)
    this.loading = false
  })
}
export function getQuotesRefresh() {
  axios.post('api/quotes-refresh').then((response) => {
    this.quotes = response.data
  })
}
export async function getQuote(id) {
  try {
    const response = await axios.get(`api/quotes/${id}`)
    this.quote = response.data
  } catch (error) {
    console.log(error)
  }
}
export async function deleteQuote(id) {
  try {
    const response = await axios.delete(`api/quotes/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
