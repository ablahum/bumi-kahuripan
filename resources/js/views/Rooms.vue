<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container px-6 py-8 mx-auto">
      <div class="flex justify-between">
        <h2 class="text-3xl font-semibold text-gray-700 capitalize">
          {{
            currentPath === '/rooms/create'
              ? 'tambah kamar'
              : currentPath === '/rooms/update'
              ? 'ubah kamar'
              : 'semua kamar'
          }}
        </h2>

        <button
          class="uppercase px-3 py-1 rounded-lg font-semibold"
          :class="
            currentPath === '/rooms'
              ? 'bg-indigo-500 text-white'
              : 'outline outline-indigo-500 text-indigo-500'
          "
        >
          <RouterLink
            :to="
              currentPath === '/rooms'
                ? {
                    name: 'CreateRoom'
                  }
                : {
                    name: 'RoomsList'
                  }
            "
          >
            {{ currentPath === '/rooms' ? 'tambah kamar' : 'kembali' }}
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

      <div class="flex flex-col mt-8">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <RouterView
            :isLoading="isLoading"
            :rooms="rooms"
            :categories="categories"
            :payload="payload"
            :errors="errors"
            :message="message"
            @create-room="createRoom"
            @update-room="updateRoom"
            @delete-room="deleteRoom"
            :current-path="currentPath"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAll, createOne, updateOne, deleteOne } from '../apis/rooms'

export default {
  data() {
    return {
      isLoading: true,
      rooms: [],
      categories: [],
      payload: {
        number: null,
        category_id: '',
        status: '',
        price: ''
      },
      message: {
        success: this.$route.query.message || null,
        failed: null
      },
      errors: {}
    }
  },
  props: {
    currentPath: String
  },
  mounted() {
    if (this.message) {
      setTimeout(() => {
        this.message = {}
      }, 5000)
    }

    this.getRooms()
  },
  methods: {
    async getRooms() {
      try {
        const res = await getAll()

        if (res.status === 200) {
          const { rooms, categories } = res.data

          this.isLoading = false
          this.rooms = rooms
          this.categories = categories
        } else if (res.status === 404) {
          this.message.failed = 'Kamar tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal memuat kamar. Silakan coba lagi.'
      }
    },
    async createRoom() {
      const { number, category_id, status, price } = this.payload
      this.errors = {}

      if (!number) this.errors.number = 'Nomor Kamar harus diisi.'
      if (!category_id) this.errors.category_id = 'Jenis Kamar harus diisi.'
      if (!status) this.errors.status = 'Status Kamar harus diisi.'
      if (!price) this.errors.price = 'Harga Kamar harus diisi.'

      if (Object.keys(this.errors).length > 0) return

      try {
        const category = this.categories.find(
          category => category.id === category_id
        )

        if (category.name === 'ac')
          this.payload.price = this.payload.price + category.additional_price

        const res = await createOne(this.payload)

        if (res.status === 201) {
          this.payload = {
            number: null,
            category_id: '',
            status: '',
            price: null
          }
          this.errors = {}

          this.$router.push('/rooms')
          this.message.success = 'Kamar berhasil ditambahkan.'
          this.getRooms()
        }
      } catch (err) {
        this.message.failed = 'Gagal menambahkan kamar. Silakan coba lagi.'
      }
    },
    async updateRoom(payload) {
      const { number, category_id, status, price } = payload
      this.errors = {}

      if (!number) this.errors.number = 'Nomor Kamar harus diisi.'
      if (!category_id) this.errors.category_id = 'Jenis Kamar harus diisi.'
      if (!status) this.errors.status = 'Status Kamar harus diisi.'
      if (!price) this.errors.price = 'Harga Kamar harus diisi.'

      if (Object.keys(this.errors).length > 0) return

      try {
        const category = this.categories.find(
          category => category.id === category_id
        )

        if (category.name === 'ac')
          payload.price = payload.price + category.additional_price

        const res = await updateOne(payload)

        this.errors = {}

        if (res.status === 204) {
          this.payload = {
            number: null,
            category_id: '',
            status: '',
            price: null
          }
          this.errors = {}

          this.$router.push('/rooms')
          this.message.success = 'Kamar berhasil diubah.'
          this.getRooms()
        } else if (res.status === 404) {
          this.message.failed = 'Kamar tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal mengubah kamar. Silakan coba lagi.'
      }
    },
    async deleteRoom(id) {
      try {
        const res = await deleteOne(id)

        if (res.status === 204) {
          this.message.success = 'Kamar berhasil dihapus.'
          this.getRooms()
        } else if (res.status === 404) {
          this.message.failed = 'Kamar tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal menghapus kamar. Silakan coba lagi.'
      }
    }
  }
}
</script>
