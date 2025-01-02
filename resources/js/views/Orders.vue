<template>
    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h3 class="text-3xl font-semibold text-gray-700 capitalize">
                    {{
                        currentPath === "/orders/create"
                            ? "tambah tamu"
                            : currentPath === "/orders/update"
                            ? "ubah tamu"
                            : "semua tamu"
                    }}
                </h3>

                <button
                    class="uppercase px-3 py-1 rounded-lg"
                    :class="
                        currentPath === '/orders'
                            ? 'bg-indigo-500 text-white'
                            : 'outline outline-indigo-500 text-black'
                    "
                >
                    <RouterLink
                        :to="
                            currentPath === '/orders'
                                ? {
                                      name: 'CreateOrder',
                                  }
                                : '/orders'
                        "
                    >
                        {{
                            currentPath === "/orders"
                                ? "tambah tamu baru"
                                : "kembali"
                        }}
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
                        :orders="orders"
                        :rooms="rooms"
                        :payload="payload"
                        :errors="errors"
                        :message="message"
                        :current-path="currentPath"
                        @create-order="createOrder"
                        @update-order="updateOrder"
                        @delete-order="deleteOrder"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAll, createOne, updateOne, deleteOne } from "../apis/rooms";

export default {
    data() {
        return {
            orders: [],
            rooms: [],
            payload: {
                guest: {
                    name: "",
                    origin: "",
                    phone: "",
                },
                room_id: "",
                start_date: null,
                end_date: null,
                total_price: null,
            },
            message: {
                success: this.$route.query.message || null,
                failed: null,
            },
            errors: {},
        };
    },
    mounted() {
        if (this.message) {
            setTimeout(() => {
                this.message = {};
            }, 5000);
        }

        this.getOrders();
    },
    computed: {
        currentPath() {
            return this.$route.path;
        },
    },
    methods: {
        async getOrders() {
            try {
                const res = await getAll();

                if (res.status === 200) {
                    const { orders, rooms } = res.data;

                    this.orders = orders;
                    this.rooms = rooms;
                }
            } catch (err) {
                this.message.failed = "Gagal memuat kamar. Silakan coba lagi.";
            }
        },
        async createOrder() {
            this.errors = {};

            if (!this.payload.guest.name)
                this.errors.name = "Nama Tamu harus diisi.";
            if (!this.payload.guest.origin)
                this.errors.origin = "Asal Tamu harus diisi.";
            if (!this.payload.guest.phone)
                this.errors.phone = "Nomor Telepon Tamu harus diisi.";
            if (!this.payload.room_id)
                this.errors.room_id = "Nomor Kamar harus diisi.";
            if (!this.payload.total_price)
                this.errors.total_price = "Total Harga harus diisi.";
            if (!this.payload.start_date)
                this.errors.start_date = "Tanggal Masuk harus diisi.";
            if (!this.payload.end_date)
                this.errors.end_date = "Tanggal Keluar harus diisi.";

            try {
                const payload = {
                    name: this.payload.guest.name,
                    origin: this.payload.guest.origin,
                    phone: String(this.payload.guest.phone),
                    room_id: this.payload.room_id,
                    start_date: this.payload.start_date,
                    end_date: this.payload.end_date,
                    total_price: this.payload.total_price,
                };

                const res = await createOne(this.payload);

                if (res.status === 201) {
                    this.payload = {
                        guest: {
                            name: "",
                            origin: "",
                            phone: "",
                        },
                        room_id: "",
                        start_date: null,
                        end_date: null,
                        total_price: null,
                    };

                    this.errors = {};

                    this.$router.push("/orders");
                    this.message.success = "Tamu berhasil ditambahkan.";
                    this.getOrders();
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menambahkan pesanan. Silakan coba lagi.";
            }
        },
        async updateOrder(payload) {
            try {
                const modifiedPayload = {
                    name: payload.guest.name,
                    origin: payload.guest.origin,
                    phone: String(payload.guest.phone),
                    room_id: payload.room_id,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    total_price: payload.total_price,
                };

                const res = await updateOne(payload.id, modifiedPayload);

                if (res.status === 204) {
                    this.$router.push("/orders");
                    this.message.success = "Tamu berhasil diubah.";
                    this.getOrders();
                }
            } catch (err) {
                this.message.failed = "Gagal mengubah Tamu. Silakan coba lagi.";
            }
        },
        async deleteOrder(id) {
            try {
                const res = await deleteOne(id);

                if (res.status === 204) {
                    this.message.success = "Tamu berhasil dihapus.";
                    this.getOrders();
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menghapus Tamu. Silakan coba lagi.";
            }
        },
    },
};
</script>
