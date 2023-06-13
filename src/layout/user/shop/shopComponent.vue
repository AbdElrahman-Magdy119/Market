<template>
  <div>
     <search/>
     <banner>
      <template v-slot:page>
         <span>Shop</span>
      </template>
     </banner>
     <sale/>
     <product/>
  </div>
</template>

<script>
 import banner from '../shop/banner.vue'
 import sale from '../shop/sale.vue'
 import search from '../shop/search.vue'
 import product from '../shop/product.vue'
export default {
    components:{
        banner,
        search,
        sale,
        product
     }
}
</script>

<style scoped>

</style>