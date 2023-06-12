<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Chart, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

export default defineComponent({
  mounted() {
    Chart.register(BarElement, CategoryScale, LinearScale, Title);

    const ctx = this.$refs.chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    });
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
});
</script>

<style scoped></style>
