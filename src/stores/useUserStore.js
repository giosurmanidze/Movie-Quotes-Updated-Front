import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: [],
  }),
  actions: {
    getUser() {
      axios.get("api/user").then((response) => {
        this.user = response.data;
      });
    },
  },
});