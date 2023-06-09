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
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent/FooterComponent.vue'
export default {
    components:{
        HeaderComponent,
        FooterComponent,
        
     }
}
</script>

<style>

</style>