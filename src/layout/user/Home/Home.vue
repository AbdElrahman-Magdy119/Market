<template>
  

<div>
   <side/>
   <category/>
   <fetchpeoduct/>
   <banner/>
   <LatestAndTopRatedAndReviewProducts/>
</div>
</template>

<script>
 import side from '../Home/sidebar&search.vue'
 import category from './category.vue'
 import fetchpeoduct from './fetchProduct.vue'
 import banner from './banner.vue'
 import LatestAndTopRatedAndReviewProducts from './LatestAndTopRatedAndReviewProducts.vue'
export default {
  components:{
       side,
       category,
       fetchpeoduct,
       banner,
       LatestAndTopRatedAndReviewProducts
     }
}
</script>

<style scoped>

</style>