<template>
    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h2 class="text-3xl font-semibold text-gray-700 capitalize">
                    {{
                        currentPath === "/orders/create"
                            ? "tambah tamu"
                            : currentPath === "/orders/update"
                            ? "ubah tamu"
                            : "semua tamu"
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
                                      name: 'CreateOrder',
                                  }
                                : {
                                      name: 'OrdersList',
                                  }
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
                        :isLoading="isLoading"
                        :orders="orders"
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
    </div>
</template>

<script>
import { getAll, createOne, updateOne, deleteOne } from "../apis/orders";

export default {
    data() {
        return {
            isLoading: true,
            orders: [],
            listRooms: [],
            payload: {
                guest: {
                    name: "",
                    origin: "",
                    phone: "",
                },
                room_id: "",
                start_date: null,
                end_date: null,
                total_price: 0,
            },
            message: {
                success: this.$route.query.message || null,
                failed: null,
            },
            errors: {},
        };
    },
    props: {
        currentPath: String,
    },
    mounted() {
        this.getOrders();
    },
    methods: {
        async getOrders() {
            try {
                const res = await getAll();

                if (res.status === 200) {
                    const { orders, rooms } = res.data;

                    this.isLoading = false;
                    this.orders = orders;
                    this.listRooms = rooms.filter(
                        (room) => room.status == "available"
                    );
                } else if (res.status === 404) {
                    this.message.failed = "Tamu tidak ada. Silakan coba lagi.";
                }
            } catch (err) {
                this.message.failed = "Gagal memuat tamu. Silakan coba lagi.";
            }
        },
        async createOrder() {
            const { room_id, total_price, start_date, end_date } = this.payload;
            const { name, origin, phone } = this.payload.guest;
            this.errors = {};

            if (!name) this.errors.name = "Nama Tamu harus diisi.";
            if (!origin) this.errors.origin = "Asal Tamu harus diisi.";
            if (!phone) this.errors.phone = "Nomor Telepon Tamu harus diisi.";
            if (!room_id) this.errors.room_id = "Nomor Kamar harus diisi.";
            if (!start_date)
                this.errors.start_date = "Tanggal Masuk harus diisi.";
            if (!end_date) this.errors.end_date = "Tanggal Keluar harus diisi.";
            if (start_date > end_date)
                this.errors.start_date =
                    "Tanggal Masuk harus sebelum Tanggal Keluar.";
            if (start_date == end_date)
                this.errors.end_date =
                    "Tanggal Keluar tidak boleh sama dengan Tanggal Masuk.";

            if (Object.keys(this.errors).length > 0) return;

            try {
                const payload = {
                    name,
                    origin,
                    phone: String(phone),
                    room_id,
                    start_date,
                    end_date,
                    total_price,
                };

                const res = await createOne(payload);

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
                        total_price: 0,
                    };
                    this.errors = {};

                    this.$router.push("/orders");
                    this.message.success = "Tamu berhasil ditambahkan.";

                    // use global state
                    if (this.message) {
                        setTimeout(() => {
                            this.message = {};
                        }, 5000);
                    }

                    this.getOrders();
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menambahkan tamu. Silakan coba lagi.";
            }
        },
        async updateOrder(payload) {
            const { room_id, start_date, end_date, total_price } = payload;
            const { name, origin, phone } = payload.guest;
            this.errors = {};

            if (!name) this.errors.name = "Nama Tamu harus diisi.";
            if (!origin) this.errors.origin = "Asal Tamu harus diisi.";
            if (!phone) this.errors.phone = "Nomor Telepon Tamu harus diisi.";
            if (!room_id) this.errors.room_id = "Nomor Kamar harus diisi.";
            if (!start_date)
                this.errors.start_date = "Tanggal Masuk harus diisi.";
            if (!end_date) this.errors.end_date = "Tanggal Keluar harus diisi.";
            if (start_date > end_date)
                this.errors.start_date =
                    "Tanggal Masuk harus sebelum Tanggal Keluar.";
            if (start_date == end_date)
                this.errors.end_date =
                    "Tanggal Keluar tidak boleh sama dengan Tanggal Masuk.";

            if (Object.keys(this.errors).length > 0) return;

            try {
                const modifiedPayload = {
                    name,
                    origin,
                    phone: String(phone),
                    room_id,
                    start_date,
                    end_date,
                    total_price,
                };

                const res = await updateOne(payload.id, modifiedPayload);

                if (res.status === 204) {
                    this.payload = {
                        guest: {
                            name: "",
                            origin: "",
                            phone: "",
                        },
                        room_id: "",
                        start_date: null,
                        end_date: null,
                        total_price: 0,
                    };
                    this.errors = {};

                    this.$router.push("/orders");
                    this.message.success = "Tamu berhasil diubah.";

                    if (this.message) {
                        setTimeout(() => {
                            this.message = {};
                        }, 5000);
                    }

                    this.getOrders();
                } else if (res.status === 404) {
                    this.message.failed = "Tamu tidak ada. Silakan coba lagi.";
                }
            } catch (err) {
                this.message.failed = "Gagal mengubah tamu. Silakan coba lagi.";
            }
        },
        async deleteOrder(id) {
            try {
                const res = await deleteOne(id);

                if (res.status === 204) {
                    this.message.success = "Tamu berhasil dihapus.";

                    if (this.message) {
                        setTimeout(() => {
                            this.message = {};
                        }, 5000);
                    }

                    this.getOrders();
                } else if (res.status === 404) {
                    this.message.failed = "Tamu tidak ada. Silakan coba lagi.";
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menghapus tamu. Silakan coba lagi.";
            }
        },
    },
};
</script>
