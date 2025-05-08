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
            class="bg-white rounded-lg p-6 grid grid-cols-1 grid-rows-[auto_auto_auto] gap-4"
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
                      ? 'bg-green-200 outline-none'
                      : item.title === 'check-out'
                      ? 'bg-red-200 outline-none'
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderStats, getRoomStats } from '../apis/dashboard'
import { CardComponent } from '../components'
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
      message: {
        success: this.$route.query.message || null,
        failed: null
      }
    }
  },
  components: {
    CardComponent
  },
  mounted() {
    this.getStats()
  },
  computed: {},
  methods: {
    async getStats() {
      try {
        const resOrders = await getOrderStats()
        const resRooms = await getRoomStats()

        if (resOrders.status === 200 && resRooms.status === 200) {
          const { status, total } = resOrders.data.data
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