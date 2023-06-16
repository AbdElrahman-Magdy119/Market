<template>
  <div style="margin-top:10rem">
        cart
  </div>
</template>

<script>
import CartService  from '@/services/CartService';
export default {
    data() {
        return {
            UserCart: [], // Initialize as an empty array
        }
     },
     mounted() {
        CartService.getUserCart().then((data) => {
        this.UserCart = data.data.data;
        console.log(this.UserCart);
        });
     }


     


}
</script>

<style>

</style>