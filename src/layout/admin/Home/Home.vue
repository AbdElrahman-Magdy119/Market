<template>
  <div>
    <h1>Admin Home</h1>
    <div>
      <AnalysisChartBar :chart-data="chartData" :options="chartOptions"></AnalysisChartBar>
    </div>
  </div>
</template>

<script>
import DashboardService from "@/services/DashboardService";
import AnalysisChartBar from "@/components/admin/AnalysisChart.vue"; // Update the import statement

export default {
  components: { AnalysisChartBar }, // Update the component name
  data() {
    return {
      analysiss: false
    };
  },
  mounted() {
    DashboardService.analysis()
        .then(response => {
          console.log(response.data);
          this.analysiss = response.data;
        })
        .catch(error => {
          console.error('Error fetching analysis data:', error);
        });
  },
  computed: {
    chartData() {
      return {
        labels: [
          'Users',
          'Categories',
          'Subcategories',
          'Products',
          'Delivered',
          'Orders',
          'Processing Orders',
          'On-Delivery Orders',
        ],
        datasets: [
          {
            label: 'Analysis Data',
            backgroundColor: '#42a5f5',
            data: Object.values(this.analysiss),
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    },
  },
};
</script>

<style scoped></style>
