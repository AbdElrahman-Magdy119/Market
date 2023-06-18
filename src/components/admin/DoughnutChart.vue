<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="doughnutData" :options="doughnutOptions" class="w-full md:w-30rem"/>
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
