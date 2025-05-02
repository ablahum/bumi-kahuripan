<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container px-6 py-8 mx-auto">
      <h2 class="text-3xl font-semibold text-gray-700 capitalize">
        pengaturan
      </h2>

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
          <div
            class="bg-white rounded-lg p-6 grid grid-cols-1 grid-rows-[auto_auto] gap-4"
          >
            <div class="grid grid-cols-1 grid-rows-[auto-auto] gap-4">
              <h3 class="capitalize text-xl font-semibold">harga</h3>

              <div
                class="flex justify-between flex-col md:flex-row md:mx-2 gap-2"
              >
                <div class="md:w-3/5 w-full">
                  <p class="font-semibold uppercase">ac</p>

                  <p class="text-gray-500">
                    <span class="capitalize">penambahan </span>harga untuk kamar
                    berjenis
                    <span class="uppercase">ac</span>
                  </p>
                </div>

                <div class="flex items-center gap-2 md:w-2/5 w-full">
                  <span class="capitalize text-gray-500">rp</span>

                  <input
                    type="text"
                    name="total-price"
                    id="total-price"
                    v-model="formattedPrice"
                    class="text-black border rounded-lg w-full p-2"
                  />
                </div>
              </div>
            </div>

            <button
              class="tracking-widest text-white bg-indigo-500 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
              @click="handleSubmit"
            >
              simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '../utils/formatter'
import { getAll, updateAll } from '../apis/settings'

export default {
  data() {
    return {
      payload: {
        price: {
          category: 0
        }
      },
      message: {
        success: this.$route.query.message || null,
        failed: null
      }
    }
  },
  mounted() {
    this.getPrices()
  },
  computed: {
    formattedPrice: {
      get() {
        return this.payload.price.category
          ? formatPrice(this.payload.price.category)
          : ''
      },
      set(value) {
        const numberOnly = parseInt(value.replace(/[^\d]/g, '')) || 0
        this.payload.price.category = numberOnly
      }
    }
  },
  methods: {
    async getPrices() {
      try {
        const res = await getAll()

        if (res.status === 200) {
          const categories = res.data.data.categories || []

          const acCategory = categories.find(
            category => category.name.toLowerCase() === 'ac'
          )

          if (acCategory && acCategory.additional_price != null)
            this.payload.price.category = acCategory.additional_price
          else this.payload.price.category = 0
        } else if (res.status === 404) {
          this.message.failed = 'Data pengaturan tidak ada. Silakan coba lagi.'
        }
      } catch (err) {
        this.message.failed = 'Gagal memuat data pengaturan. Silakan coba lagi.'
      }
    },
    async handleSubmit() {
      try {
        const res = await updateAll(this.payload.price)

        if (res.status === 204) {
          this.message.success = 'Pengaturan berhasil diubah.'

          this.getPrices()
          this.clearMessageAfterDelay()
        } else if (res.status === 404) {
          this.message.failed =
            'Gagal mengubah data pengaturan. Silakan coba lagi.'

          this.clearMessageAfterDelay()
        }
      } catch (err) {
        this.message.failed =
          'Gagal mengubah data pengaturan. Silakan coba lagi.'

        this.clearMessageAfterDelay()
      }
    },
    clearMessageAfterDelay() {
      setTimeout(() => {
        this.message = {}
      }, 5000)
    }
  }
}
</script>