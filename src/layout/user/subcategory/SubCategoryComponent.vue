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
<div class="container">
<div class="row">
<div
  class="col-lg-3 col-md-4 col-sm-6 ms-5"
  v-for="SubCategory in SubCategories"
  :key="SubCategory.id"
>
  <div class="product__item">
    <div class="product__item__pic set-bg">
      <img :src="`http://localhost:8000/` + SubCategory.image" />
    </div>
    <div
      class="d-flex justify-content-center align-items-center flex-column"
    >
      <h1>
        <router-link :to="'/productBySubcategory/' + SubCategory.id">{{
          SubCategory.name
        }}</router-link>
      </h1>
      <!-- <a class=" btn btn-primary " >Show Products</a> -->
    </div>
  </div>
</div>
</div>
</div>
</body>
</html>
</template>

<script>
import HomeService from '@/services/HomeService'
export default {
data: () => ({
SubCategories: [],
}),
mounted() {
HomeService.getٍSubcategoryByCategoryID(this.$route.params.id).then(
(data) => {
  this.SubCategories = data.data.Subcategories;
}
);
},
methods: {},
};
</script>

<style scoped>
.container {
margin-top: 10rem;
}
.category {
color: #5c5c5c;
font-size: 5rem;
margin-top: 2rem;
}

a {
text-decoration: none;
}
img {
height: 20rem;
width: 15rem;
}
a {
text-decoration: none;
color: #444;
}

.example-card {
width: 90%;
min-height: 35rem;
}
.unimation {
transition: 0.4s;
}

.btn {
color: #3bb77e;
}
.btn:hover {
color: #ffba43;
}
.unimation:hover {
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
transform: translate(0px, -15px);
}
</style>
