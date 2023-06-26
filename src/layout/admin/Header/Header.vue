<template>
<nav class="navbar navbar-expand-lg  bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../../../../public/images/product-6.jpg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      Bootstrap
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <form class="d-flex" role="search">
        <a id="username" class="nav-link" aria-current="page" href="#">{{ capitalizedName }}</a>
        <button class="logout-button btn btn btn-outline-success" @click="logout">Log Out</button>
      </form>
    </div>
  </div>
</nav>  
</template>

<script>
    import * as router from 'vue-router';
    import authService from '@/services/AuthService';
export default {
    data(){
        return{
            userName:null
        }
    },
    created() {
        this.userName = localStorage.getItem('name');
    },
    computed:{
        capitalizedName() {
            return this.capitalize(this.userName);
        }
    },
    methods:{
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
    logout(){
      localStorage.clear();
      this.$router.push('/login');
      authService.userData = {};
      console.log(authService.userData);
    }
  }
}
</script>

<style>
#navbarSupportedContent
{
  justify-content: flex-end;
}
.navbar-brand
{
  color: white;
}

.logout-button:hover
{
  background-color: orange !important;
}

.logout-button:focus
{
  background-color: #D32F2F !important;
}

#username:hover{
    color:WHITE;
}
</style>