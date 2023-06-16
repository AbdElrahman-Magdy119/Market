<template>
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Responsive Grocery Store Website</title>

    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <link rel="stylesheet" href="/css/style.css">

</head>
<body>
  <div style="margin-top: 10rem;">
    product details
  </div>
</body>
    </html>
    
</template>

<script>
import ProductService  from '@/services/ProductService';
export default {
    data() {
        return {
            product: {}, // Initialize as an empty array
        }
    },
    mounted() {
		ProductService.getProductById(this.$route.params.idProduct).then((data) => {
        this.product = data.data.data;
        console.log(this.product);
		});
    }
}
</script>

<style scoped>

</style>