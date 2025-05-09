<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container px-6 py-8 mx-auto">
      <div class="flex justify-between">
        <h2 class="text-3xl font-semibold text-gray-700 capitalize">
          {{
            currentPath === '/orders/create'
              ? 'tambah tamu'
              : currentPath === '/orders/update'
              ? 'ubah tamu'
              : 'semua tamu'
          }}
        </h2>

        <button
          class="uppercase px-3 py-1 rounded-lg font-semibold"
          :class="
            currentPath === '/orders'
              ? 'bg-indigo-500 text-white'
              : 'outline outline-indigo-500 text-indigo-500'
          "
        >
          <RouterLink
            :to="
              currentPath === '/orders'
                ? {
                    name: 'CreateOrder'
                  }
                : {
                    name: 'OrdersList'
                  }
            "
          >
            {{ currentPath === '/orders' ? 'tambah tamu' : 'kembali' }}
          </RouterLink>
        </button>
      </div>

      <div
        v-if="message && (message.success || message.failed)"
        class="py-2 px-4 rounded-lg mt-4"
        :class="message.success ? 'bg-green-400' : 'bg-red-400'"
      >
        <p class="font-semibold">
          {{ message.success ? message.success : message.failed }}
        </p>
      </div>

      <div
        class="mt-8 py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex flex-col"
      >
        <div
          class="mb-4 gap-4 flex items-center sm:justify-between w-full"
          v-if="
            !$route.path.includes('create') && !$route.path.includes('update')
          "
        >
          <SearchComponent @filter="applyFilter" />

          <FilterComponent @filter="applyFilter" />
        </div>

        <RouterView
          :isLoading="isLoading"
          :orders="filteredOrders"
          :listRooms="listRooms"
          :payload="payload"
          :message="message"
          :errors="errors"
          @create-order="createOrder"
          @update-order="updateOrder"
          @delete-order="deleteOrder"
          :current-path="currentPath"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAll, createOne, updateOne, deleteOne } from '../apis/orders'
import { FilterComponent, SearchComponent } from '../components'
import { formatDate } from '../utils/formatter'

export default {
  data() {
    return {
      isLoading: true,
      allOrders: [],
      filteredOrders: [],
      filters: {
        keyword: '',
        selectedStatus: [],
        startDate: null,
        endDate: null
      },
      listRooms: [],
      payload: {
        guest: {
          name: '',
          origin: '',
          phone: '',
          identity_photo: null
        },
        room_id: '',
        start_date: null,
        end_date: null,
        total_price: 0,
        status_id: ''
      },
      message: {
        success: this.$route.query.message || null,
        failed: null
      },
      errors: {}
    }
  },
  components: {
    SearchComponent,
    FilterComponent
  },
  props: {
    currentPath: String
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      try {
        const res = await getAll()

        if (res.status === 200) {
          const { orders, rooms } = res.data

          this.isLoading = false
          this.allOrders = orders
          this.filteredOrders = [...orders]
          this.listRooms = rooms.filter((room) => room.status_id == 1)
        } else if (res.status === 404) {
          this.message.failed = 'Tamu tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal memuat tamu. Silakan coba lagi.'
      }
    },
    async createOrder() {
      const { room_id, total_price, start_date, end_date } = this.payload
      const { name, origin, phone, identity_photo } = this.payload.guest
      this.errors = {}

      if (!name) this.errors.name = 'Nama Tamu harus diisi.'
      if (!origin) this.errors.origin = 'Asal Tamu harus diisi.'
      if (!phone) this.errors.phone = 'Nomor Telepon Tamu harus diisi.'
      if (!identity_photo) this.errors.identity_photo = 'Foto KTP harus diisi.'
      if (!room_id) this.errors.room_id = 'Nomor Kamar harus diisi.'
      if (!start_date) this.errors.start_date = 'Tanggal Masuk harus diisi.'
      if (!end_date) this.errors.end_date = 'Tanggal Keluar harus diisi.'
      if (
        identity_photo &&
        !['image/png', 'image/jpeg', 'image/jpg'].includes(identity_photo.type)
      ) {
        this.errors.identity_photo = 'Foto KTP harus berformat foto/gambar'
      }
      if (start_date > end_date)
        this.errors.start_date = 'Tanggal Masuk harus sebelum Tanggal Keluar.'
      if (start_date == end_date)
        this.errors.end_date =
          'Tanggal Keluar tidak boleh sama dengan Tanggal Masuk.'

      if (Object.keys(this.errors).length > 0) return

      try {
        const payload = new FormData()
        payload.append('name', name)
        payload.append('origin', origin)
        payload.append('phone', String(phone))
        payload.append('identity_photo', identity_photo)
        payload.append('room_id', room_id)
        payload.append('start_date', formatDate('to-iso', start_date))
        payload.append('end_date', formatDate('to-iso', end_date))
        payload.append('total_price', total_price)
        payload.append('status_id', '3')

        const res = await createOne(payload)

        if (res.status === 201) {
          this.payload = {
            guest: {
              name: '',
              origin: '',
              phone: '',
              identity_photo: null
            },
            room_id: '',
            start_date: null,
            end_date: null,
            total_price: 0,
            status_id: ''
          }
          this.errors = {}

          this.$router.push('/orders')
          this.message.success = 'Tamu berhasil ditambahkan.'

          // use global state
          if (this.message) {
            setTimeout(() => {
              this.message = {}
            }, 5000)
          }

          this.getOrders()
        }
      } catch (err) {
        console.log(err)

        this.message.failed = 'Gagal menambahkan tamu. Silakan coba lagi.'
      }
    },
    async updateOrder(payload) {
      const { room_id, start_date, end_date, total_price, status_id } = payload
      const { name, origin, phone, identity_photo } = payload.guest
      this.errors = {}

      if (!name) this.errors.name = 'Nama Tamu harus diisi.'
      if (!origin) this.errors.origin = 'Asal Tamu harus diisi.'
      if (!phone) this.errors.phone = 'Nomor Telepon Tamu harus diisi.'
      if (!identity_photo) this.errors.identity_photo = 'Foto KTP harus diisi.'
      if (!room_id) this.errors.room_id = 'Nomor Kamar harus diisi.'
      if (!start_date) this.errors.start_date = 'Tanggal Masuk harus diisi.'
      if (!end_date) this.errors.end_date = 'Tanggal Keluar harus diisi.'

      if (identity_photo) {
        if (typeof identity_photo === 'object') {
          if (
            !['image/png', 'image/jpeg', 'image/jpg'].includes(
              identity_photo.type
            )
          ) {
            this.errors.identity_photo = 'Foto KTP harus berformat foto/gambar'
          }
        } else if (typeof identity_photo === 'string') {
          if (
            !identity_photo.toLowerCase().includes('.jpg') &&
            !identity_photo.toLowerCase().includes('.jpeg') &&
            !identity_photo.toLowerCase().includes('.png')
          ) {
            this.errors.identity_photo = 'Foto KTP harus berformat foto/gambar'
          }
        }
      }

      if (start_date > end_date)
        this.errors.start_date = 'Tanggal Masuk harus sebelum Tanggal Keluar.'
      if (start_date == end_date)
        this.errors.end_date =
          'Tanggal Keluar tidak boleh sama dengan Tanggal Masuk.'

      if (Object.keys(this.errors).length > 0) return

      try {
        const modifiedPayload = new FormData()
        modifiedPayload.append('name', name)
        modifiedPayload.append('origin', origin)
        modifiedPayload.append('phone', String(phone))
        modifiedPayload.append('identity_photo', identity_photo)
        modifiedPayload.append('room_id', room_id)
        modifiedPayload.append('start_date', formatDate('to-iso', start_date))
        modifiedPayload.append('end_date', formatDate('to-iso', end_date))
        modifiedPayload.append('total_price', total_price)
        modifiedPayload.append('status_id', status_id)

        const res = await updateOne(payload.id, modifiedPayload)

        if (res.status === 204) {
          this.payload = {
            guest: {
              name: '',
              origin: '',
              phone: '',
              identity_photo: null
            },
            room_id: '',
            start_date: null,
            end_date: null,
            total_price: 0,
            status_id: ''
          }
          this.errors = {}

          this.$router.push('/orders')
          this.message.success = 'Tamu berhasil diubah.'

          if (this.message) {
            setTimeout(() => {
              this.message = {}
            }, 5000)
          }

          this.getOrders()
        } else if (res.status === 404) {
          this.message.failed = 'Tamu tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        console.log(err)

        this.message.failed = 'Gagal mengubah tamu. Silakan coba lagi.'
      }
    },
    async deleteOrder(id) {
      try {
        const res = await deleteOne(id)

        if (res.status === 204) {
          this.message.success = 'Tamu berhasil dihapus.'

          if (this.message) {
            setTimeout(() => {
              this.message = {}
            }, 5000)
          }

          this.getOrders()
        } else if (res.status === 404) {
          this.message.failed = 'Tamu tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal menghapus tamu. Silakan coba lagi.'
      }
    },
    applyFilter(newFilters = {}) {
      this.filters = {
        keyword:
          newFilters.keyword !== undefined
            ? newFilters.keyword
            : this.filters.keyword,
        selectedStatus:
          newFilters.selectedStatus !== undefined
            ? newFilters.selectedStatus
            : this.filters.selectedStatus,
        startDate:
          newFilters.startDate !== undefined
            ? newFilters.startDate
            : this.filters.startDate,
        endDate:
          newFilters.endDate !== undefined
            ? newFilters.endDate
            : this.filters.endDate
      }

      const { keyword, selectedStatus, startDate, endDate } = this.filters

      let result = JSON.parse(JSON.stringify(this.allOrders))

      if (keyword) {
        const lower = keyword.toLowerCase()
        result = result.filter((order) => {
          const name = String(order.guest.name || '').toLowerCase()
          const origin = String(order.guest.origin || '').toLowerCase()
          return name.includes(lower) || origin.includes(lower)
        })
      }

      if (selectedStatus.length) {
        result = result.filter((order) =>
          selectedStatus.includes(String(order.status_id))
        )
      }

      if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        result = result.filter((order) => {
          const orderStart = new Date(order.start_date)
          const orderEnd = new Date(order.end_date)
          return orderStart >= start && orderEnd <= end
        })
      }

      this.filteredOrders = result
    }
  }
}
</script>
