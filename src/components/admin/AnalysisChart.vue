
<template>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
// import { defineComponent } from 'vue';
import Chart from 'primevue/chart';
export default {
  components: {
    Chart,
  },
  data() {
    return {
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped></style>
