<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="uppercase px-3 py-1 rounded-lg font-semibold"
      :class="
        open
          ? 'bg-indigo-500 text-white'
          : 'outline outline-indigo-500 text-indigo-500'
      "
    >
      {{ !open ? 'urutkan' : 'batalkan' }}
    </button>

    <div
      v-if="open"
      class="absolute z-10 w-64 bg-white border border-gray-200 rounded shadow-lg right-2 top-10"
    >
      <div>
        <button
          @click="toggleAccordion('status')"
          class="w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 capitalize"
        >
          berdasarkan status
        </button>

        <div v-show="activeAccordion === 'status'" class="px-4 py-2 space-y-2">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              :value="$route.path === '/orders' ? '3' : '1'"
              class="w-4 h-4"
              v-model="selectedStatus"
            />
            <span class="capitalize">
              {{ $route.path === '/orders' ? 'check-in' : 'tersedia' }}
            </span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              :value="$route.path === '/orders' ? '4' : '2'"
              class="w-4 h-4"
              v-model="selectedStatus"
            />
            <span class="capitalize">
              {{ $route.path === '/orders' ? 'check-out' : 'tidak tersedia' }}
            </span>
          </label>
        </div>
      </div>

      <div class="mt-4" v-if="$route.path === '/orders'">
        <button
          @click="toggleAccordion('date')"
          class="w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 capitalize"
        >
          berdasarkan tanggal
        </button>

        <div v-show="activeAccordion === 'date'" class="px-4 py-2 space-y-2">
          <label class="block capitalize">
            tanggal masuk:

            <flat-pickr
              v-model="startDate"
              :config="{ dateFormat: 'd-m-Y' }"
              class="w-full border px-2 py-1 rounded mt-2"
              placeholder="Pilih tanggal masuk..."
            />
          </label>

          <label class="block capitalize">
            tanggal keluar:

            <flat-pickr
              v-model="endDate"
              :config="{ dateFormat: 'd-m-Y' }"
              class="w-full border px-2 py-1 rounded mt-2"
              placeholder="Pilih tanggal keluar..."
            />
          </label>
        </div>
      </div>

      <div class="flex justify-end px-4 py-2 border-t">
        <button
          @click="applyFilter"
          class="text-indigo-500 hover:underline font-semibold uppercase"
        >
          terapkan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { formatDate } from '../utils/formatter'

export default {
  name: 'FilterComponent',
  data() {
    return {
      open: false,
      activeAccordion: 'status',
      selectedStatus: [],
      startDate: '',
      endDate: ''
    }
  },
  components: { FlatPickr },
  methods: {
    toggleDropdown() {
      this.open = !this.open
    },
    toggleAccordion(section) {
      this.activeAccordion = this.activeAccordion === section ? null : section
    },
    applyFilter() {
      const payload = {
        selectedStatus: this.selectedStatus
      }

      if (this.startDate && this.endDate) {
        payload.startDate = formatDate('to-iso', this.startDate)
        payload.endDate = formatDate('to-iso', this.endDate)
      }

      this.$emit('filter', payload)
    }
  }
}
</script>