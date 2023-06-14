<template>
    <div>
    <search/>
    <banner>
      <template v-slot:page>
         <span>Shopping Cart</span>
      </template>
     </banner>
     <cart/>
  </div>
</template>

<script>
 import search from '../shop/search.vue'
 import banner from '../shop/banner.vue'
 import cart from '../Cart/cartdetails.vue'
export default {
    components:{
        search,
        banner,
        cart
     }
}
</script>

<style>

</style>