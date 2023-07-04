<template>
     <div class="container mt-3">
       <div class="row">
         <div class="col-12">
           <img class="centered-image" src="../../../../public/images/notfound.svg" alt="not found">
         </div>
         <div class="col-12 mt-5 text-center">
           <router-link to="/" class="btn btn-primary">Home</router-link>
         </div>
       </div>
     </div>

 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.centered-image {
  display: block;
  margin: 0 auto;
}

 </style>