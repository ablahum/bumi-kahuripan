<template>
  <div class="flex flex-col">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div v-if="isLoading" class="text-center">
        <h3 class="text-2xl font-semibold capitalize">Loading...</h3>
      </div>

      <div
        v-else-if="!isLoading && (orders?.length === 0 || rooms?.length === 0)"
        class="text-center"
      >
        <h3 class="text-2xl font-semibold">
          <span class="capitalize">Tidak </span>ada data
        </h3>
      </div>

      <table class="min-w-full" v-else>
        <thead>
          <tr v-if="currentPath === '/orders'">
            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              nama
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              asal
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              nomor telepon
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              foto ktp
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-1/12"
            >
              nomor kamar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              tanggal masuk
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              tanggal keluar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              total harga
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              status
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            ></th>
          </tr>

          <tr v-if="currentPath === '/rooms'">
            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              nomor kamar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              jenis kamar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              status kamar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            >
              harga kamar
            </th>

            <th
              class="px-6 py-3 text-xs font-medium leading-4 text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
            ></th>
          </tr>
        </thead>

        <tbody class="bg-white" v-if="currentPath === '/orders'">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm font-medium leading-5 text-gray-900 capitalize">
                {{ order.guest.name }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 capitalize">
                {{ order.guest.origin }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900">
                {{ order.guest.phone }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-blue-500 capitalize underline">
                <a
                  :href="`/storage/${order.guest.identity_photo}`"
                  target="_blank"
                >
                  lihat foto
                </a>
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900">
                {{ order.room.number }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 uppercase">
                {{ formattedDate(order.start_date) }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 uppercase">
                {{ formattedDate(order.end_date) }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 capitalize">
                rp {{ formattedPrice(order.total_price) }}
              </p>
            </td>

            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
              :class="
                order.status_id === 3
                  ? 'bg-green-300'
                  : order.status_id === 4
                  ? 'bg-red-300'
                  : ''
              "
            >
              <p class="text-sm leading-5 text-gray-900 capitalize">
                {{
                  order.status_id === 3
                    ? 'check-in'
                    : order.status_id === 4
                    ? 'check-out'
                    : ''
                }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div class="flex items-center gap-2 h-full">
                <RouterLink
                  :to="{
                    name: 'UpdateOrder',
                    query: { order: JSON.stringify(order) }
                  }"
                  class="text-indigo-500 px-2 py-1 rounded hover:text-white hover:bg-indigo-500 font-semibold uppercase"
                >
                  ubah
                </RouterLink>

                <button
                  class="text-red-500 px-2 py-1 rounded hover:text-white hover:bg-red-500 font-semibold uppercase"
                  @click="$emit('deleteOrder', order.guest_id, order.id)"
                >
                  hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody class="bg-white" v-if="currentPath === '/rooms'">
          <tr v-for="room in rooms" :key="room.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm font-medium leading-5 text-gray-900">
                {{ room.number }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 uppercase">
                {{ room.category.name }}
              </p>
            </td>

            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize"
              :class="
                room.status_id === 1
                  ? 'bg-green-300'
                  : room.status_id === 2
                  ? 'bg-red-300'
                  : ''
              "
            >
              <p class="text-sm leading-5 text-gray-900">
                {{
                  room.status_id === 1
                    ? 'tersedia'
                    : room.status_id === 2
                    ? 'tidak tersedia'
                    : ''
                }}
              </p>
            </td>

            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 text-gray-900 capitalize">
                rp {{ formattedPrice(room.price) }}
              </p>
            </td>

            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex items-center gap-2"
            >
              <button
                class="text-indigo-500 px-2 py-1 rounded hover:text-white hover:bg-indigo-500 font-semibold uppercase"
              >
                <RouterLink
                  :to="{
                    name: 'UpdateRoom',
                    query: { room: JSON.stringify(room) }
                  }"
                  class="m-0"
                >
                  ubah
                </RouterLink>
              </button>

              <button
                class="text-red-500 px-2 py-1 rounded hover:text-white hover:bg-red-500 font-semibold uppercase"
                @click="$emit('deleteRoom', room.id)"
              >
                hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { formatDate, formatPrice } from '../utils/formatter'

export default {
  name: 'TableComponent',
  props: {
    isLoading: Boolean,
    orders: Array,
    rooms: Array,
    deleteOrder: Function,
    deleteRoom: Function,
    currentPath: String
  },
  methods: {
    formattedPrice(price) {
      return formatPrice(price)
    },
    formattedDate(date) {
      return formatDate(date)
    }
  }
}
</script>
