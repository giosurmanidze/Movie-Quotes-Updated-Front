import { defineStore } from 'pinia'
import axios from '@/config/axios/auth-index'
import axiosInstance from '@/config/axios/index'

export const useMoviesStore = defineStore('useMoviesStore', {
  state: () => ({
    movies: [],
    movie: [],
    quotes: [],
    allCategories: [],
    edited: false,
    updatedMovie: [],
    searchValue: ''
  }),
  actions: {
    getMovies() {
      axios.get('api/movies').then((response) => {
        this.movies = response.data
      })
    },
    getCategories() {
      axios.get('api/genres').then((response) => {
        this.allCategories = [...response.data]
      })
    },
    searchMovie() {
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
    },
    deleteMovie(id) {
      axiosInstance
        .delete(`api/movies/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
