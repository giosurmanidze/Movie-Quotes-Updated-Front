import { defineStore } from "pinia";
import axios from "@/config/axios/auth-index";
import axiosInstance from "@/config/axios/index";

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
    deleteMovie(id) {
      axiosInstance
        .delete(`api/movies/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
});