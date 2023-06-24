<template>
  <div>
    <h1>Admin Home</h1>
    <div v-if="analysis">
      <AnalysisChartBar :chart-data="chartData" :chart-options="chartOptions"></AnalysisChartBar>
    </div>
      <div v-if="doughnut" class="my-4">
          <DoughnutChart :doughnut-data="doughnutData" :doughnut-options="doughnutOptions"></DoughnutChart>
      </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>


<script>
import DashboardService from "@/services/DashboardService";
import AnalysisChartBar from "@/components/admin/AnalysisChart.vue";
import DoughnutChart from "@/components/admin/DoughnutChart.vue";

export default {
  components: {
    AnalysisChartBar,
      DoughnutChart,
  },
  data() {
    return {
        analysis: null,
        doughnut: null
    };
  },
  mounted() {
    DashboardService.analysis()
        .then(response => {
          // console.log(response.data);
          this.analysis = response.data;
        })
        .catch(error => {
          console.error('Error fetching analysis data: ', error);
        });

    DashboardService.getOrdersStatus()
        .then(response => {
            // console.log(response.data);
            this.doughnut = response.data;
        })
        .catch(error =>{
            console.error('Error fetching doughnut data: ', error);
        })
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
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1,
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
      doughnutData(){
          const documentStyle = getComputedStyle(document.body);

          if (this.doughnut) {
              return {
                  labels: ['Processing', 'On Delivery', 'Delivered', 'Deleted'],
                  datasets: [
                      {
                          label: 'Orders Total Status',
                          backgroundColor: [
                              documentStyle.getPropertyValue('--blue-500'),
                              documentStyle.getPropertyValue('--yellow-500'),
                              documentStyle.getPropertyValue('--green-500'),
                              documentStyle.getPropertyValue('--red-500')
                          ],

                          hoverBackgroundColor: [
                              documentStyle.getPropertyValue('--blue-400'),
                              documentStyle.getPropertyValue('--yellow-400'),
                              documentStyle.getPropertyValue('--green-400'),
                              documentStyle.getPropertyValue('--red-400')
                          ],
                          data: [
                              this.doughnut.processingOrdersCount,
                              this.doughnut.onDeliveryOrdersCount,
                              this.doughnut.deliveredOrdersCount,
                              this.doughnut.deletedOrdersCount,
                          ],
                      },
                  ],
              };
          } else {
              return null;
          }
      },
      doughnutOptions(){
          return {
              responsive: true,
              maintainAspectRatio: false,
          };
      },
  },
};
</script>

<style scoped>
</style>