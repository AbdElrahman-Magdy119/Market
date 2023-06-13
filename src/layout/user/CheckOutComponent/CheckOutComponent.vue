<template>
   <div>
    <search/>
    <banner>
      <template v-slot:page>
         <span>Shopping CheckOut</span>
      </template>
     </banner>
     <checkoutdetails/>
  </div>
</template>

<script>
 import search from '../shop/search.vue'
 import banner from '../shop/banner.vue'
 import checkoutdetails from '../CheckOutComponent/checkoutdetails.vue'
export default {
    components:{
        search,
        banner,
        checkoutdetails
     }
}
</script>

<style>

</style>