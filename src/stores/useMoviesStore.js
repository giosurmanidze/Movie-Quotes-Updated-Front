import { defineStore } from "pinia";
import axios from "../config/axios/auth-index";

export const useMoviesStore = defineStore("useMoviesStore", {
  state: () => ({
    movies: [],
    quotes: [],
    edited: false,
    updatedMovie: [],
  }),
  actions: {
    getMovies() {
      axios.get("api/movies").then((response) => {
        this.movies = response.data;
      });
    },
  },
});