<template>
  <div>
    <search/>
    <banner>
      <template v-slot:page>
         <span>Contact</span>
      </template>
     </banner>
     <MoreDetails/>
     <Map/>
     <ContactUsByMail/>
  </div>
</template>

<script>
 import search from '../shop/search.vue'
 import banner from '../shop/banner.vue'
 import MoreDetails from '../contact/MoreDetails.vue'
 import Map from '../contact/Map.vue'
 import ContactUsByMail from '../contact/ContactUsByMail.vue'
export default {
    components:{
        search,
        banner,
        MoreDetails,
        Map,
        ContactUsByMail
     }
}
</script>

<style>

</style>