<template>
  <div>
    Header
    <button @click="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.clear();
    }
  }
}
</script>

<style>

</style>