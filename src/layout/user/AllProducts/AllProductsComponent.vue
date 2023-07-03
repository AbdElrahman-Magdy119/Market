<template>
  <div style="margin-top: 10rem">
    <div class="container">
      <div class="row">
        <template v-if="subcategories">
          <div class="col">
          <h2>Subcategories</h2>
          <ul class="list-group">
            <li
                class="list-group-item"
                v-for="subcategory in subcategories"
                :key="subcategory.id"
            >
              <h4>{{ subcategory.name }}</h4>
              <div class="row">
                <div class="col">
                  <div class="card-group">
                    <div
                        class="card"
                        v-for="product in subcategory.products"
                        :key="product.id"
                    >
                      <img
                          :src="`http://localhost:8000/`+product.image"
                          class="card-img-top"
                          :alt="product.name"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                        <p class="card-text">Price: {{ product.price }}</p>
                        <p class="card-text">Quantity: {{ product.quantity }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </template>
        <template v-else>
          <div class="card flex justify-content-center">
            <ProgressSpinner />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import Tree from 'primevue/tree';
import HomeService from "@/services/HomeService";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components:{
    Sidebar,
    Button,
    Tree,
    ProgressSpinner
  },
  data() {
        return {
          subcategories:null,
        }
    },
  mounted() {
    HomeService.getAllSubCategories().then((response)=>{
      this.subcategories=response.data.data
    })
  },
  methods() {

  }
}
</script>

<style scoped>
.card-img-top{
  width:5rem;
}

</style>