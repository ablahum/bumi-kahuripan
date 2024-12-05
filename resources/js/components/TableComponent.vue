<template>
    <!-- <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h3 class="text-3xl font-semibold text-gray-700 capitalize">
                    semua kamar
                </h3>

                <button
                    class="uppercase bg-indigo-500 text-white px-3 py-1 rounded-lg"
                >
                    <router-link to="/rooms/create" class="m-0"
                        >tambah kamar baru</router-link
                    >
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
            </div> -->

    <div class="flex flex-col mt-8">
        <div
            class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                            nomor kamar
                        </th>

                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                            jenis kamar
                        </th>

                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                            status kamar
                        </th>

                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                            harga kamar
                        </th>

                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        ></th>
                    </tr>
                </thead>

                <tbody class="bg-white">
                    <tr v-for="room in rooms" :key="room.id">
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                        >
                            <p
                                class="text-sm font-medium leading-5 text-gray-900"
                            >
                                {{ room.number }}
                            </p>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                        >
                            <p
                                class="text-sm leading-5 text-gray-900 uppercase"
                            >
                                {{ room.category.name }}
                            </p>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize"
                            :class="
                                room.status === 'available'
                                    ? 'bg-green-300'
                                    : 'bg-red-300'
                            "
                        >
                            <p class="text-sm leading-5 text-gray-900">
                                {{
                                    room.status === "available"
                                        ? "tersedia"
                                        : "tidak Tersedia"
                                }}
                            </p>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                        >
                            <p
                                class="text-sm leading-5 text-gray-900 capitalize"
                            >
                                rp. {{ room.price }}
                            </p>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex items-center gap-2"
                        >
                            <!-- <a
                                            href="/rooms/{{ room.id }}/edit"
                                            class="text-indigo-500 hover:text-indigo-900 uppercase"
                                            >edit</a
                                        > -->
                            <button
                                class="text-indigo-500 hover:text-indigo-900 uppercase"
                            >
                                <router-link to="/rooms/update" class="m-0"
                                    >ubah</router-link
                                >
                            </button>

                            <button
                                class="text-red-500 hover:text-indigo-900 uppercase"
                                :onclick="() => this.deleteRoom(room.id)"
                            >
                                hapus
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- </div>
    </div> -->
</template>

<script>
export default {
    name: "TableComponent",
    data() {
        return {
            title: "",
            rooms: [],
            message: {
                success: this.$route.query.message || null,
                failed: null,
            },
        };
    },
    watch: {
        "$route.query.message"(newMessage) {
            this.message = newMessage;
        },
    },
    mounted() {
        if (this.message) {
            setTimeout(() => {
                this.message = {};
            }, 5000);
        }
        this.getRooms();
    },
    methods: {
        async getRooms() {
            try {
                const res = await this.$axios.get("/api/rooms");
                const { data } = res.data;

                this.rooms = data;
            } catch (err) {
                this.message.failed = "Gagal memuat kamar. Silakan coba lagi.";
            }
        },
        async deleteRoom(id) {
            try {
                await this.$axios.delete(`/api/rooms/${id}`);

                this.message.success = "Kamar berhasil dihapus.";
                this.getRooms();
            } catch (err) {
                this.message.failed =
                    "Gagal menghapus kamar. Silakan coba lagi.";
            }
        },
    },
};
</script>
