import { defineStore } from 'pinia'
import { getMovies, getCategories, searchMovie, deleteMovie } from './actions'

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
    getMovies,
    getCategories,
    searchMovie,
    deleteMovie
  }
})
