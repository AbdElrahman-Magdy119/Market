<template>
   <div>
        <div>
           <HeaderComponent/>
        </div>

        <div> 
             <RouterView></RouterView> 
        </div>

        <div>
           <FooterComponent/> 
        </div>

    </div>
</template>

<script>
import HeaderComponent from '@/layout/user/Header/Header.vue'
import FooterComponent from '@/layout/user/Footer/Footer.vue'
export default {
    components:{
        HeaderComponent,
        FooterComponent,
        
     }
}
</script>

<style>

</style>