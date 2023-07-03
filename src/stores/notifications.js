import { defineStore } from "pinia";

export const usecarditem =defineStore("usecarditem",{
    state:()=>({
        cardNumberStore:localStorage.getItem('cardNumber'),
        wishlistNumberStore:localStorage.getItem('wishlistNumber'),
    })
})