<template>
  <section class="blog" id="blog">
    <h1 class="heading">Our <span> Packages</span></h1>
    <div class="box-container">
      <div class="box" v-for="packagee in packages" :key="packagee.id">
        <div class="image">
          <img :src="`http://localhost:8000/`+packagee.image" alt="" />
          <Badge :value="`${packagee.discount}%`" size="xlarge" severity="warning" class="badge-over-image"></Badge>
        </div>
        <div class="content">
          <div class="icons">
            <a> <i class="fas fa-clock"></i> {{ formatCreatedAt(packagee.created_at) }} </a>
          </div>
          <h3>{{ packagee.name }}</h3>
          <p>
            <div class="d-flex justify-content-between">
              <h4>{{ formatPrice(packagee.total_price) }}</h4>
<!--              <h4>Before : {{ formatPrice( (packagee.total_price / (1 - packagee.discount/100)).toFixed(2) ) }}</h4>-->
            </div>
<!--            <h4>{{ packagee.discount }}</h4>-->
          </p>
          <router-link :to="'/package/'+packagee.id" class="btn"> read more </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HomeService from '@/services/HomeService';
import Badge from 'primevue/badge';

export default {
  components: {
    Badge,
  },
  data() {
    return {
      packages: [],
    };
  },
  mounted() {
    HomeService.getAllPackages().then((data) => {
      this.packages = data.data.Packages;
    });
  },
  methods: {
    formatCreatedAt(dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      return `${month}/${day}`;
    },
    formatPrice(price) {
      const formattedPrice = `${price} EGP`;
      const dashIndex = formattedPrice.indexOf('-');
      if (dashIndex !== -1) {
        return formattedPrice.slice(0, dashIndex) + ' -';
      }
      return formattedPrice;
    },
  },
};
</script>

<style scoped>
.image {
  position: relative;
}

.badge-over-image {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>
