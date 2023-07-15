import axios from '@/config/axios/auth-index'

export function getMovies() {
  axios.get('api/movies').then((response) => {
    this.movies = response.data
  })
}

export function getCategories() {
  axios.get('api/genres').then((response) => {
    this.allCategories = [...response.data]
  })
}

export function searchMovie() {
  const searchValue = this.searchValue.toLowerCase()

  if (searchValue) {
    return this.movies.filter((movie) => {
      const movieNameEn = movie.name.en.toLowerCase()
      const movieNameKa = movie.name.ka.toLowerCase()
      return movieNameEn.includes(searchValue) || movieNameKa.includes(searchValue)
    })
  } else {
    return this.movies
  }
}

export async function deleteMovie(id) {
  try {
    const response = await axios.delete(`api/movies/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
