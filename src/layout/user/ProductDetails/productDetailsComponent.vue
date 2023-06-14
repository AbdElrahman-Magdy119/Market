<template>
    <div>
     <search/>
     <banner>
     <template v-slot:page>
         <span>Shop</span>
     </template>
     </banner>
     <productInfo/>
     <RelatedProduct/>
    </div>
</template>

<script>
import search from '../shop/search.vue'
import banner from '../shop/banner.vue'
import productInfo from '../ProductDetails/productInfo.vue'
import RelatedProduct from '../ProductDetails/RelatedProduct.vue'
export default {
    components:{
        banner,
        search,
        productInfo,
        RelatedProduct
       
     }
}
</script>

<style>

</style>