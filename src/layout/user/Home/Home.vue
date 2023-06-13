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
 import side from '../../../components/user/Home/sidebar&search.vue'
 import category from '../../../components/user/Home/category.vue'
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