import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {}, // Retrieve user data from local storage
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Store user data in local storage
    },
    clearUser() {
      this.user = {};
      localStorage.removeItem("user"); // Remove user data from local storage
    },
  },
});
