<template>
  <div v-if="package" class="card mt-5">
    <div class="m-5">
      <h1>Package Details</h1>

      <div class="row">
        <div class="col-md-6">
          <img :src="`http://localhost:8000/` + package.image" class="package-image" alt="Package Image">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">{{ package.name }}</h5>
            <p class="card-text">{{ package.description }}</p>
            <p class="card-text">Total Price: {{ package.total_price }}</p>
            <p class="card-text">Discount: {{ package.discount }}%</p>
          </div>
        </div>
      </div>
    </div>
    <div class="m-5">
      <h2>Package Items</h2>
      <div class="card flex justify-content-center mb-5">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
                  :showItemNavigators="true" :showThumbnails="false">
          <template #item="slotProps">
            <img :src="`http://localhost:8000/`+slotProps.item.product.image" :alt="slotProps.item.alt" style="width: 100%;height:50%; display: block;" />
          </template>
<!--          <template #thumbnail="slotProps">-->
<!--            <img :src="slotProps.item.product.image" :alt="slotProps.item.alt" style="display: block;" />-->
<!--          </template>-->
        </Galleria>
      </div>
<!--      <div v-for="item in PackageItems" :key="item.id">-->
<!--        <img :src="item.product.image" :alt="item.product.name" />-->
<!--      </div>-->
      <div class="row">
        <div class="col-md-6">
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="item in PackageItems" :key="item.id" class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ item.product.name }}</h5>
                  <p class="card-text">Quantity: {{ item.quantity }}</p>
                  <p class="card-text">Price: {{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeService from '@/services/HomeService';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';

export default {
  components: {
    Carousel,
    Galleria
  },
  data() {
    return {
      images: null,
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
      ],
      package: null,
      PackageItems: [],
      id: this.$route.params.id, //this is the id from the browser
    }
  },
  mounted() {
    HomeService.getPackageByID(this.id).then((data) => {
      this.package = data.data.data;
      this.PackageItems = data.data.data.package_items;
      this.images = data.data.data.package_items;
      console.log(this.images);
    });

  },
}
</script>

<style scoped>
  img{
    width:100%;
    margin:10px;
  }
</style>
