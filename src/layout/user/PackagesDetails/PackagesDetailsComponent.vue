<template>
    <div v-if="package" class="card mt-5">
    <div style="margin-top: 10rem">
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

    <h2>Package Items</h2>

    <div class="row">
      <div class="col-md-6">
        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(item, index) in PackageItems" :key="item.id" :class="['carousel-item', index === 0 ? 'active' : '']">
              <img :src="`http://localhost:8000/` + item.product.image" class="d-block w-100" alt="Product Image">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
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
</template>

<script>
import HomeService from '@/services/HomeService';

export default {
  data() {
    return {
      package: null,
      PackageItems: [],
    }
  },
  mounted() {
    HomeService.getPackageByID(this.$route.params.idPackage).then((data) => {
      this.package = data.data.data;
      this.PackageItems = data.data.data.package_items;
    });
  },
}
</script>

<style>

</style>
