<template>
  <div v-if="package" class="container mt-5">
    <div style="margin-top: 10rem">
      <h1 class="text-center m-5">Package Details</h1>
      <div class="row">
        <div class="col-md-6">
          <img :src="`http://localhost:8000/` + package.image" class="package-image" alt="Package Image">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h1 class="card-title">{{ package.name }}</h1>
            <p class="card-text fontSize">{{ package.description }}</p>
            <p class="card-text fontSize">Total Price: {{ package.total_price }}</p>
            <p class="card-text fontSize">Discount: {{ package.discount }}%</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <h2 class="text-center">Package Items</h2>

      <div class="col-md-6">
        <div class="card flex justify-content-center mb-5">
          <Galleria :value="PackageItems" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px"
                    :circular="true" :autoPlay="true" :transitionInterval="2000">
            <template #item="slotProps">
              <img :src="`http://localhost:8000/`+slotProps.item.product.image" :alt="slotProps.item.alt" style="width: 50%; display: block;" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="`http://localhost:8000/`+slotProps.item.product.image" :alt="slotProps.item.alt" style="width: 50%; display: block;" />
            </template>
          </Galleria>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div v-for="item in PackageItems" :key="item.id" class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ item.product.name }}</h5>
                <p class="card-text fontSize">Quantity: {{ item.quantity }}</p>
                <p class="card-text fontSize">Price: {{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col-12 text-center" >
                <Button class="fontSize" severity="success" label="Order Now" @click="proceedFromPackageDetailsToCheckout" />
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HomeService from '@/services/HomeService';
import Galleria from 'primevue/galleria';
import Button from 'primevue/button';

export default {
  components: {
    Galleria,
      Button
  },
  data() {
    return {
      images: null,
      package: null,
        PackageItems: [],
      responsiveOptions: [
        {
          breakpoint: '991px',
          numVisible: 4
        },
        {
          breakpoint: '767px',
          numVisible: 3
        },
        {
          breakpoint: '575px',
          numVisible: 1
        }
      ]
    }
  },
  mounted() {
    HomeService.getPackageByID(this.$route.params.idPackage).then((data) => {
      this.package = data.data.data;
      this.PackageItems = data.data.data.package_items;

    });
  },
    methods:{
        proceedFromPackageDetailsToCheckout(){
          localStorage.setItem('userpackage', JSON.stringify(this.package));
          this.$router.push('/checkoutpackage');
      },
    },
}
</script>

<style scoped>
img{
  width:100%;
  margin:10px;
}
.fontSize{
  font-size:15px;
}
.card{
  margin:4rem;
}
</style>
