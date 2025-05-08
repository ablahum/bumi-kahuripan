<template>
  <div class="overflow-x-auto">
    <div class="min-w-[600px] min-h-[450px] w-full h-full">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>


<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartComponent',
  components: {
    Bar
  },
  props: {
    chartData: Object,
    chartOptions: Object
  }
}
</script>