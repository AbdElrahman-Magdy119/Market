import { defineStore } from "pinia";

export const useCartStore = defineStore("auth", {
  state: () => ({
    items: [],
  }),
});
