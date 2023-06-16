<template>
  <div class="my-3">
    Header
    <button class="btn btn-outline-warning" @click="logout">Log Out</button>
  </div>
</template>

<script>
    import * as router from 'vue-router';
export default {
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>