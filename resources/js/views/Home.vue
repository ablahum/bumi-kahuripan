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
                      ? 'baru Check-In'
                      : item.title === 'check-out'
                      ? 'sudah Check-Out'
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
              <h3 class="capitalize text-xl font-semibold">penghasilan</h3>

              <div
                class="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grid-rows-1 sm:grid-rows-[auto_auto] grid-rows-[auto_auto_auto_auto]"
              >
                <CardComponent
                  v-for="(item, index) in allOrdersByDate"
                  :key="index"
                  :title="item.title"
                  :type="'amount'"
                  :amount="item.amount"
                  :description="`Jumlah pendapatan di ${
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
import { getAll } from '../apis/orders'
import { CardComponent } from '../components'
import { formatPrice } from '../utils/formatter'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(isToday)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekOfYear)

export default {
  data() {
    return {
      isLoading: true,
      allOrdersByStatus: [
        { title: 'check-in', count: 0 },
        { title: 'check-out', count: 0 }
      ],
      allOrdersByDate: [
        { title: 'harian', count: 0, amount: 0 },
        { title: 'mingguan', count: 0, amount: 0 },
        { title: 'bulanan', count: 0, amount: 0 },
        { title: 'tahunan', count: 0, amount: 0 }
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
    this.getOrders()
  },
  computed: {},
  methods: {
    async getOrders() {
      try {
        const res = await getAll()

        if (res.status === 200) {
          const { orders } = res.data
          const today = dayjs()
          const currentWeek = today.week()
          const currentMonth = today.month()
          const currentYear = today.year()

          const categorized = {
            checkin: 0,
            checkout: 0,
            daily: {
              count: 0,
              amount: 0
            },
            weekly: {
              count: 0,
              amount: 0
            },
            monthly: {
              count: 0,
              amount: 0
            },
            annually: {
              count: 0,
              amount: 0
            }
          }

          orders.forEach((order) => {
            const start = dayjs(order.start_date)
            const end = dayjs(order.end_date)
            const price = Number(order.total_price) || 0

            if (start.isToday() && order.status_id === 3) categorized.checkin++
            if (end.isToday() && order.status_id === 4) categorized.checkout++

            if (start.isToday()) {
              categorized.daily.count++
              categorized.daily.amount += price
            }

            if (start.week() === currentWeek && start.year() === currentYear) {
              categorized.weekly.count++
              categorized.weekly.amount += price
            }

            if (
              start.month() === currentMonth &&
              start.year() === currentYear
            ) {
              categorized.monthly.count++
              categorized.monthly.amount += price
            }

            if (start.year() === currentYear) {
              categorized.annually.count++
              categorized.annually.amount += price
            }
          })

          this.allOrdersByStatus = [
            { title: 'check-in', count: categorized.checkin },
            { title: 'check-out', count: categorized.checkout }
          ]

          this.allOrdersByDate = [
            {
              title: 'harian',
              count: categorized.daily.count,
              // amount: categorized.daily.amount
              amount: formatPrice(categorized.daily.amount)
            },
            {
              title: 'mingguan',
              count: categorized.weekly.count,
              amount: formatPrice(categorized.weekly.amount)
            },
            {
              title: 'bulanan',
              count: categorized.monthly.count,
              amount: formatPrice(categorized.monthly.amount)
            },
            {
              title: 'tahunan',
              count: categorized.annually.count,
              amount: formatPrice(categorized.annually.amount)
            }
          ]

          this.isLoading = false
        } else if (res.status === 404) {
          this.message.failed = 'Data tamu tidak ada.'
        }
      } catch (err) {
        this.message.failed = 'Gagal memuat data tamu.'
      }
    }
  }
}
</script>