<template>
    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h3 class="text-3xl font-semibold text-gray-700 capitalize">
                    {{
                        currentPath === "/rooms/create"
                            ? "tambah kamar"
                            : currentPath === "/rooms/update"
                            ? "ubah kamar"
                            : "semua kamar"
                    }}
                </h3>

                <button
                    class="uppercase px-3 py-1 rounded-lg"
                    :class="
                        currentPath === '/rooms'
                            ? 'bg-indigo-500 text-white'
                            : 'outline outline-indigo-500 text-black'
                    "
                >
                    <RouterLink
                        :to="
                            currentPath === '/rooms'
                                ? {
                                      name: 'CreateRoom',
                                  }
                                : '/rooms'
                        "
                        class="m-0"
                    >
                        {{
                            currentPath === "/rooms"
                                ? "tambah kamar baru"
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
                    <!-- <div
                        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md sm:rounded-lg"
                    > -->
                    <!-- <RouterView /> -->

                    <RouterView
                        :rooms="rooms"
                        :categories="categories"
                        :payload="payload"
                        :errors="errors"
                        :message="message"
                        :current-path="currentPath"
                        @create-room="createRoom"
                        @update-room="updateRoom"
                        @delete-room="deleteRoom"
                    />

                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rooms: [],
            categories: [],
            payload: {
                number: null,
                category_id: "",
                status: "",
                price: null,
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

        this.getRooms();
    },
    computed: {
        currentPath() {
            return this.$route.path;
        },
    },
    methods: {
        async getRooms() {
            try {
                const res = await this.$axios.get("/api/rooms");

                if (res.status === 200) {
                    const { rooms, categories } = res.data;

                    this.rooms = rooms;
                    this.categories = categories;
                }
            } catch (err) {
                this.message.failed = "Gagal memuat kamar. Silakan coba lagi.";
            }
        },
        async createRoom(payload) {
            this.errors = {};

            if (!this.payload.number)
                this.errors.number = "Nomor Kamar harus diisi.";
            if (!this.payload.category_id)
                this.errors.category = "Jenis Kamar harus diisi.";
            if (!this.payload.status)
                this.errors.status = "Status Kamar harus diisi.";
            if (!this.payload.price)
                this.errors.price = "Harga Kamar harus diisi.";

            try {
                const res = await this.$axios.post("/api/rooms", payload);

                this.payload = {
                    number: null,
                    category_id: "",
                    status: "",
                    price: null,
                };
                this.errors = {};

                if (res.status === 200) {
                    this.$router.push("/rooms");
                    this.message.success = "Kamar berhasil ditambahkan.";
                    this.getRooms();
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menambahkan kamar. Silakan coba lagi.";
            }
        },
        async updateRoom(payload) {
            console.log(payload);

            // try {
            //     const res = await this.$axios.put(
            //         `/api/rooms/${payload.id}`,
            //         payload
            //     );

            //     this.errors = {};

            //     if (res.status === 200) {
            //         this.$router.push("/rooms");
            //         this.message.success = "Kamar berhasil diubah.";
            //         this.getRooms();
            //     }
            // } catch (err) {
            //     this.message.failed =
            //         "Gagal mengubah kamar. Silakan coba lagi.";
            // }
        },
        async deleteRoom(id) {
            try {
                const res = await this.$axios.delete(`/api/rooms/${id}`);

                if (res.status === 200) {
                    this.message.success = "Kamar berhasil dihapus.";
                    this.getRooms();
                }
            } catch (err) {
                this.message.failed =
                    "Gagal menghapus kamar. Silakan coba lagi.";
            }
        },
    },
};
</script>
