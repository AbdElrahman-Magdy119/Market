<template>
  <h1>
    {{ products }}
  </h1>
</template>


<script>
import axios from 'axios';
let apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
})
export default {

  data() {
    return {
      products: [], // Initialize as an empty array
      roleDialog: false,
      deleteroleDialog: false,
      role: {},
      selectedroles: null,
      filters: {},
      submitted: false,
    }
  },

  mounted() {
    apiClient.get('/products').then((data) => {
      this.products = data
    });
  },
}
</script>