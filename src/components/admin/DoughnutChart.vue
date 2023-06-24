<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="doughnutData" width="100px" height="100px" :options="doughnutOptions" class="w-full md:w-40rem"/>
    </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
    name: "DoughnutChart",
    components: {
        Chart,
    },
    props: {
        doughnutData: {
            type: Object,
            required: true,
        },
        doughnutOptions: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style scoped>
</style>
