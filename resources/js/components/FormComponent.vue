<template>
  <div class="p-6 rounded-lg bg-white">
    <div
      class="grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-4"
      v-if="
        currentPath === '/orders/create' || currentPath === '/orders/update'
      "
    >
      <div
        class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto_auto] gap-4 items-start"
      >
        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="name" class="block capitalize">nama tamu:</label>

          <input
            type="text"
            name="name"
            id="name"
            v-model="activePayload.guest.name"
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Masukkan nama tamu..."
          />

          <p v-if="errors.name" class="text-red-500 font-semibold text-end">
            {{ errors.name }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="origin" class="block capitalize">asal tamu:</label>

          <input
            type="text"
            name="origin"
            id="origin"
            v-model="activePayload.guest.origin"
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.origin }"
            placeholder="Masukkan asal tamu..."
          />

          <p v-if="errors.origin" class="text-red-500 font-semibold text-end">
            {{ errors.origin }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="phone" class="block capitalize"
            >nomor telepon tamu:</label
          >

          <input
            type="text"
            name="phone"
            id="phone"
            v-model="activePayload.guest.phone"
            @input="
              activePayload.guest.phone = activePayload.guest.phone.replace(
                /[^0-9]/g,
                ''
              )
            "
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.phone }"
            placeholder="Masukkan nomor telepon tamu..."
          />

          <p v-if="errors.phone" class="text-red-500 font-semibold text-end">
            {{ errors.phone }}
          </p>
        </div>
      </div>

      <div
        class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto_auto] gap-4 items-start"
      >
        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="start-date" class="block capitalize"
            >foto <span class="uppercase">ktp:</span></label
          >

          <input
            class="block w-full text-sm text-gray-400 p-2 border rounded-lg cursor-pointer"
            :class="{ 'border-red-500': errors.identity_photo }"
            id="identity_photo"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            @change="handleFile"
          />

          <p
            v-if="errors.identity_photo"
            class="text-red-500 font-semibold text-end"
          >
            {{ errors.identity_photo }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="start-date" class="block capitalize"
            >tanggal masuk:</label
          >

          <flat-pickr
            v-model="activePayload.start_date"
            :config="{ dateFormat: 'd-m-Y' }"
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.start_date }"
            placeholder="Pilih tanggal masuk..."
          />

          <p
            v-if="errors.start_date"
            class="text-red-500 font-semibold text-end"
          >
            {{ errors.start_date }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="end-date" class="block capitalize">tanggal keluar:</label>

          <flat-pickr
            v-model="activePayload.end_date"
            :config="{ dateFormat: 'd-m-Y' }"
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.end_date }"
            placeholder="Pilih tanggal keluar..."
          />

          <p v-if="errors.end_date" class="text-red-500 font-semibold text-end">
            {{ errors.end_date }}
          </p>
        </div>
      </div>

      <div
        class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
        :class="{
          'md:grid-cols-3 grid-rows-[auto_auto_auto]': this.mode === 'update'
        }"
      >
        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="room-id" class="block capitalize">nomor kamar:</label>

          <select
            name="room-id"
            id="room-id"
            v-model="activePayload.room_id"
            class="text-black border rounded-lg w-full p-2 uppercase"
            :class="{ 'border-red-500': errors.room_id }"
          >
            <option value="" disabled>---pilih kamar---</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              {{ room.number }}
            </option>
            <option value="" disabled v-if="!rooms.length">
              tidak ada kamar yang tersedia
            </option>
          </select>

          <p v-if="errors.room_id" class="text-red-500 font-semibold text-end">
            {{ errors.room_id }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="total-price" class="block capitalize">total harga:</label>

          <div class="flex items-center gap-2">
            <span class="capitalize text-gray-500">rp</span>

            <input
              type="text"
              name="total-price"
              id="total-price"
              :value="formatTotalPrice"
              class="text-black border rounded-lg w-full p-2"
              disabled
            />
          </div>

          <p
            v-if="errors.total_price"
            class="text-red-500 font-semibold text-end"
          >
            {{ errors.total_price }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 grid-rows-[auto_auto] gap-2 h-full"
          v-if="this.mode === 'update'"
        >
          <label for="total-price" class="block capitalize">status:</label>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <input
                id="check-in"
                type="radio"
                value="3"
                v-model="activePayload.status_id"
                name="status_id"
                class="w-4 h-4"
              />
              <label for="check-in" class="capitalize">check-in</label>
            </div>

            <div class="flex items-center gap-2">
              <input
                id="check-out"
                type="radio"
                value="4"
                v-model="activePayload.status_id"
                name="status_id"
                class="w-4 h-4"
              />
              <label for="check-out" class="capitalize">check-out</label>
            </div>
          </div>
        </div>
      </div>

      <button
        class="tracking-widest text-white bg-indigo-500 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
        @click="handleSubmit"
      >
        {{ currentPath === '/orders/create' ? 'tambah' : 'ubah' }}
      </button>
    </div>

    <div
      class="grid grid-rows-[auto_auto_auto] grid-cols-1 gap-4"
      v-if="currentPath === '/rooms/create' || currentPath === '/rooms/update'"
    >
      <div
        class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
      >
        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="number" class="block capitalize">nomor kamar:</label>

          <input
            type="number"
            name="number"
            id="number"
            v-model="activePayload.number"
            class="text-black border rounded-lg w-full p-2"
            :class="{ 'border-red-500': errors.number }"
            placeholder="Masukkan nomor kamar..."
          />

          <p v-if="errors.number" class="text-red-500 font-semibold text-end">
            {{ errors.number }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="category-id" class="block capitalize">jenis kamar:</label>

          <select
            name="category-id"
            id="category-id"
            v-model="activePayload.category_id"
            class="text-black border rounded-lg w-full p-2 uppercase"
            :class="{ 'border-red-500': errors.category_id }"
          >
            <option value="" disabled>---pilih jenis---</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>

          <p
            v-if="errors.category_id"
            class="text-red-500 font-semibold text-end"
          >
            {{ errors.category_id }}
          </p>
        </div>
      </div>

      <div
        class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
      >
        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="number" class="block capitalize">status kamar:</label>

          <select
            name="status"
            id="status"
            v-model="activePayload.status_id"
            class="border rounded-lg w-full p-2 uppercase"
            :class="{ 'border-red-500': errors.status_id }"
          >
            <option value="" disabled>---pilih status---</option>
            <option value="1">tersedia</option>
            <option value="2">tidak tersedia</option>
          </select>

          <p
            v-if="errors.status_id"
            class="text-red-500 font-semibold text-end"
          >
            {{ errors.status_id }}
          </p>
        </div>

        <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
          <label for="price" class="block capitalize">harga kamar:</label>

          <div class="flex items-center gap-2">
            <span class="capitalize text-gray-500">rp</span>

            <input
              type="number"
              name="price"
              id="price"
              v-model="activePayload.price"
              class="text-black border rounded-lg w-full p-2"
              :class="{ 'border-red-500': errors.price }"
              placeholder="Masukkan harga kamar..."
            />
          </div>

          <p v-if="errors.price" class="text-red-500 font-semibold text-end">
            {{ errors.price }}
          </p>
        </div>
      </div>

      <button
        class="tracking-widest text-white bg-indigo-500 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
        @click="handleSubmit"
      >
        {{ currentPath === '/rooms/create' ? 'tambah' : 'ubah' }}
      </button>
    </div>
  </div>
</template>

<script>
import { getOne } from '../apis/rooms'
import countPrice from '../utils/countPrice'
import { formatDate, formatPrice } from '../utils/formatter'
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'FormComponent',
  data() {
    return {
      updatePayload: {},
      rooms: []
    }
  },
  props: {
    listRooms: Array,
    categories: Array,
    payload: Object,
    errors: Object,
    currentPath: String
  },
  components: { FlatPickr },
  watch: {
    'payload.room_id': 'updateTotalPrice',
    'payload.start_date': 'updateTotalPrice',
    'payload.end_date': 'updateTotalPrice',
    'updatePayload.room_id': 'updateTotalPrice',
    'updatePayload.start_date': 'updateTotalPrice',
    'updatePayload.end_date': 'updateTotalPrice',
    listRooms: {
      immediate: true,
      handler(newVal) {
        this.updateRooms(newVal)
      }
    },
    $route: {
      immediate: true,
      handler() {
        this.initializeUpdatePayload()
        this.updateRooms(this.listRooms)
      }
    }
  },
  computed: {
    mode() {
      return this.currentPath.includes('create') ? 'create' : 'update'
    },
    activePayload() {
      return this.mode === 'create' ? this.payload : this.updatePayload
    },
    formatTotalPrice() {
      const isOrders = this.currentPath.includes('orders')

      return formatPrice(
        isOrders ? this.activePayload.total_price : this.activePayload.price
      )
    }
  },
  created() {
    this.initializeUpdatePayload()
    this.updateRooms(this.listRooms)
  },
  methods: {
    initializeUpdatePayload() {
      if (
        this.mode === 'update' &&
        (this.$route.query.room || this.$route.query.order)
      ) {
        let data

        if (this.currentPath.includes('orders'))
          data = JSON.parse(this.$route.query.order)
        else data = JSON.parse(this.$route.query.room)

        this.updatePayload = { ...data }
      }
    },
    updateRooms(newListRooms) {
      if (!Array.isArray(newListRooms)) {
        newListRooms = []
      }

      this.rooms = [...newListRooms]

      if (
        this.mode === 'update' &&
        this.updatePayload.room &&
        !this.rooms.find((room) => room.id === this.updatePayload.room.id)
      )
        this.rooms.push(this.updatePayload.room)
    },
    async updateTotalPrice() {
      const { room_id, start_date, end_date } = this.activePayload

      if (start_date && end_date && room_id) {
        try {
          const res = await getOne(room_id)

          this.activePayload.total_price = countPrice(
            res.data.room.price,
            formatDate('to-iso', start_date),
            formatDate('to-iso', end_date)
          )
        } catch (err) {
          console.log(err)
        }
      } else {
        this.activePayload.total_price = 0
      }
    },
    handleFile(event) {
      this.activePayload.guest.identity_photo = event.target.files[0]
    },
    handleSubmit() {
      if (this.mode === 'create') {
        if (this.currentPath.includes('orders')) {
          this.$emit('createOrder')
        } else {
          this.$emit('createRoom')
        }
      } else {
        if (this.currentPath.includes('orders')) {
          this.$emit('updateOrder', this.activePayload)
        } else {
          this.$emit('updateRoom', this.activePayload)
        }
      }
    }
  }
}
</script>
