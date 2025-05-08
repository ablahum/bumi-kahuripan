<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container px-6 py-8 mx-auto">
      <h2 class="text-3xl font-semibold text-gray-700 capitalize">beranda</h2>

      <div
        v-if="message && (message.success || message.failed)"
        class="py-2 px-4 rounded-lg mt-4"
        :class="message.success ? 'bg-green-400' : 'bg-red-400'"
      >
        <p class="font-semibold">
          {{ message.success ? message.success : message.failed }}
        </p>
      </div>

      <div class="flex flex-col mt-8">
        <div v-if="isLoading" class="text-center">
          <h3 class="text-2xl font-semibold capitalize">Memuat...</h3>
        </div>

        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          v-if="!isLoading"
        >
          <div
            class="bg-white rounded-lg p-6 grid grid-cols-1 grid-rows-[auto_auto_auto_auto_auto] gap-4"
          >
            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-4 mb-2">
              <h3 class="capitalize text-xl font-semibold">status kamar</h3>

              <div
                class="grid gap-4 md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto]"
              >
                <CardComponent
                  v-for="(item, index) in allRoomsByStatus"
                  :key="index"
                  :title="item.title"
                  :type="'count'"
                  :count="item.count"
                  :description="`Jumlah kamar yang ${item.title} di hari ini`"
                  :class="
                    item.title === 'tersedia'
                      ? 'outline-green-200'
                      : item.title === 'tidak tersedia'
                      ? 'outline-red-200'
                      : ''
                  "
                />
              </div>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-4 mb-2">
              <h3 class="capitalize text-xl font-semibold">status tamu</h3>

              <div
                class="grid gap-4 md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto]"
              >
                <CardComponent
                  v-for="(item, index) in allOrdersByStatus"
                  :key="index"
                  :title="item.title"
                  :type="'count'"
                  :count="item.count"
                  :description="`Jumlah tamu yang ${
                    item.title === 'check-in'
                      ? 'baru check-in'
                      : item.title === 'check-out'
                      ? 'sudah check-out'
                      : ''
                  } hari ini`"
                  :class="
                    item.title === 'check-in'
                      ? 'bg-green-300 outline-none'
                      : item.title === 'check-out'
                      ? 'bg-red-300 outline-none'
                      : ''
                  "
                />
              </div>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-4 mb-2">
              <h3 class="capitalize text-xl font-semibold">jumlah tamu</h3>

              <div
                class="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grid-rows-1 sm:grid-rows-[auto_auto] grid-rows-[auto_auto_auto_auto]"
              >
                <CardComponent
                  v-for="(item, index) in allOrdersByDate"
                  :key="index"
                  :title="item.title"
                  :type="'count'"
                  :count="item.count"
                  :description="`Jumlah tamu di ${
                    item.title === 'harian'
                      ? 'hari'
                      : item.title === 'mingguan'
                      ? 'minggu'
                      : item.title === 'bulanan'
                      ? 'bulan'
                      : item.title === 'tahunan'
                      ? 'tahun'
                      : ''
                  } ini`"
                  :class="
                    item.title === 'harian'
                      ? 'bg-red-200 outline-none'
                      : item.title === 'mingguan'
                      ? 'bg-yellow-200 outline-none'
                      : item.title === 'bulanan'
                      ? 'bg-green-200 outline-none'
                      : item.title === 'tahunan'
                      ? 'bg-blue-200 outline-none'
                      : ''
                  "
                />
              </div>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-4 mb-2">
              <h3 class="capitalize text-xl font-semibold">pendapatan</h3>

              <div
                class="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grid-rows-1 sm:grid-rows-[auto_auto] grid-rows-[auto_auto_auto_auto]"
              >
                <CardComponent
                  v-for="(item, index) in allOrdersByDate"
                  :key="index"
                  :title="item.title"
                  :type="'revenue'"
                  :revenue="item.revenue"
                  :description="`Jumlah laba kotor di ${
                    item.title === 'harian'
                      ? 'hari'
                      : item.title === 'mingguan'
                      ? 'minggu'
                      : item.title === 'bulanan'
                      ? 'bulan'
                      : item.title === 'tahunan'
                      ? 'tahun'
                      : ''
                  } ini`"
                  :class="
                    item.title === 'harian'
                      ? 'outline-red-200'
                      : item.title === 'mingguan'
                      ? 'outline-yellow-200'
                      : item.title === 'bulanan'
                      ? 'outline-green-200'
                      : item.title === 'tahunan'
                      ? 'outline-blue-200'
                      : ''
                  "
                />
              </div>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-4 mb-2">
              <h3 class="capitalize text-xl font-semibold">statistik</h3>

              <div class="flex flex-col">
                <div class="flex flex-col gap-2 self-end w-1/4">
                  <div class="flex items-center">
                    <label for="range" class="block w-1/2">
                      Rentang waktu:
                    </label>
                    <select
                      id="range"
                      v-model="allOrdersStats.range"
                      class="text-black border rounded-lg p-2 capitalize w-1/2"
                    >
                      <option value="weekly">mingguan</option>
                      <option value="monthly">bulanan</option>
                      <option value="annually">tahunan</option>
                    </select>
                  </div>

                  <div class="flex items-center">
                    <label for="type" class="block w-1/2">Jenis:</label>
                    <select
                      id="type"
                      v-model="allOrdersStats.type"
                      class="text-black border rounded-lg p-2 capitalize w-1/2"
                    >
                      <option value="count">jumlah tamu</option>
                      <option value="revenue">pendapatan</option>
                    </select>
                  </div>
                </div>

                <ChartComponent
                  :chartData="chartData"
                  :chartOptions="chartOptions"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderStats, getRoomStats } from '../apis/dashboard'
import { CardComponent, ChartComponent } from '../components'
import { formatPrice } from '../utils/formatter'

export default {
  data() {
    return {
      isLoading: true,
      allRoomsByStatus: [
        { title: '', count: 0 },
        { title: '', count: 0 }
      ],
      allOrdersByStatus: [
        { title: '', count: 0 },
        { title: '', count: 0 }
      ],
      allOrdersByDate: [
        { title: '', count: 0, revenue: 0 },
        { title: '', count: 0, revenue: 0 },
        { title: '', count: 0, revenue: 0 },
        { title: '', count: 0, revenue: 0 }
      ],
      allOrdersStats: {
        range: 'weekly',
        type: 'count',
        weekly: [],
        monthly: [],
        annually: []
      },
      message: {
        success: this.$route.query.message || null,
        failed: null
      }
    }
  },
  components: {
    CardComponent,
    ChartComponent
  },
  mounted() {
    this.getStats()
  },
  computed: {
    chartData() {
      const range = this.allOrdersStats.range
      const type = this.allOrdersStats.type
      const dataSet = this.allOrdersStats[range] || []

      const labels = dataSet.map((d) => d.label || d.day)
      const data = dataSet.map((d) => d[type])

      return {
        labels,
        datasets: [
          {
            label: type === 'count' ? 'Jumlah Tamu' : 'Pendapatan',
            backgroundColor: '#6366f1',
            data
          }
        ]
      }
    },
    chartOptions() {
      const type = this.allOrdersStats.type
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return type === 'revenue'
                  ? 'Rp' + value.toLocaleString('id-ID')
                  : value
              },
              stepSize: type === 'count' ? 1 : undefined
            }
          }
        }
      }
    }
  },
  methods: {
    async getStats() {
      try {
        const resOrders = await getOrderStats()
        const resRooms = await getRoomStats()

        if (resOrders.status === 200 && resRooms.status === 200) {
          const { status, total, breakdown } = resOrders.data.data
          const { data } = resRooms.data

          this.allRoomsByStatus = [
            {
              title: 'tersedia',
              count: data.available
            },
            {
              title: 'tidak tersedia',
              count: data.unavailable
            }
          ]
          this.allOrdersByStatus = Object.entries(status).map(
            ([key, value]) => {
              return {
                title: key,
                count: value
              }
            }
          )
          this.allOrdersByDate = [
            {
              title: 'harian',
              count: total.daily.count,
              revenue: formatPrice(total.daily.revenue)
            },
            {
              title: 'mingguan',
              count: total.weekly.count,
              revenue: formatPrice(total.weekly.revenue)
            },
            {
              title: 'bulanan',
              count: total.monthly.count,
              revenue: formatPrice(total.monthly.revenue)
            },
            {
              title: 'tahunan',
              count: total.annually.count,
              revenue: formatPrice(total.annually.revenue)
            }
          ]
          this.allOrdersStats.weekly = breakdown.weekly
          this.allOrdersStats.monthly = breakdown.monthly
          this.allOrdersStats.annually = breakdown.annually

          this.isLoading = false
        } else if (res.status === 404) {
          this.message.failed = 'Data tamu dan kamar tidak ada.'
        }
      } catch (err) {
        this.message.failed = 'Gagal memuat data tamu dan kamar.'
      }
    }
  }
}
</script>