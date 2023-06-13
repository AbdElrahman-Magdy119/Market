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
import AnalysisChartBar from "@/components/admin/AnalysisChart.vue";

export default {
  components: {
    AnalysisChartBar
  },
  data() {
    return {
      analysis: null,
    };
  },
  mounted() {
    DashboardService.analysis()
        .then(response => {
          console.log(response.data);
          this.analysis = response.data;
        })
        .catch(error => {
          console.error('Error fetching analysis data:', error);
        });
  },
  computed: {
    chartData() {
      if (this.analysis) {
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
              data: [
                this.analysis.users,
                this.analysis.categories,
                this.analysis.subCategories,
                this.analysis.products,
                this.analysis.delivered,
                this.analysis.orders,
                this.analysis.processing_orders,
                this.analysis.OnDelivery_orders,
              ],
            },
          ],
        };
      } else {
        return null;
      }
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

<style scoped>
</style>