<template>
  <div class="success-card">
    <h3>Error Happened Your Transaction Doesn't Complete </h3>
    <p>Thank you for shopping with us!</p>
    <router-link to="/" class="btn btn-primary">Home</router-link>
  </div>
</template>

<style scoped>
.success-card {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
}

.success-card h3 {
  font-size: 24px;
  color: #333;
}

.success-card p {
  font-size: 18px;
  color: #555;
}
</style>
<script setup>
</script>