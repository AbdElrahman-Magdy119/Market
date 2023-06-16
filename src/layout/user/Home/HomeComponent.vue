<template>

<div>
   <Banner/>
   <AllCategory/>
   <TrendingProduct/>
   <Packages/>
</div>
</template>

<script>
import Banner from '../../../components/user/Home/Banner.vue'
import AllCategory from '../../../components/user/Home/AllCategory.vue'
import TrendingProduct from '../../../components/user/Home/TrendingProduct.vue'
import Packages from '../../../components/user/Home/Packages.vue'
export default {
  components:{
       Banner,
       AllCategory,
       TrendingProduct,
       Packages
     }
}
</script>

<style scoped>

</style>