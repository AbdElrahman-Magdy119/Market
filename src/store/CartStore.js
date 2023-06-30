import { defineStore } from "pinia";

export const useCartStore = defineStore("auth", {
  state: () => ({
    items: [],
  }),
  actions:{
    set_items(products){
      this.items = products;
      },
    clear_items(){
      this.items = [];
      },
    },
});
