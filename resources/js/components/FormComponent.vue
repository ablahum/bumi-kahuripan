<template>
    <!-- <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h3 class="text-3xl font-semibold text-gray-700 capitalize">
                    tambah kamar baru
                </h3>

                <button
                    class="uppercase outline outline-indigo-500 px-3 py-1 rounded-lg tracking-widest"
                >
                    <router-link to="/rooms" class="m-0">batal</router-link>
                </button>
            </div>

            <div
                v-if="errors.failed"
                class="bg-red-400 py-2 px-4 rounded-lg mt-4"
            >
                <p class="font-semibold">
                    {{ errors.failed }}
                </p>
            </div> -->

    <div
        class="mt-8 p-6 rounded-lg bg-white grid grid-rows-[auto_auto_auto] grid-cols-1 gap-4"
    >
        <div
            class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
        >
            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                <label for="number" class="block capitalize"
                    >nomor kamar:</label
                >

                <input
                    type="number"
                    name="number"
                    id="number"
                    v-model="payload.number"
                    class="text-black border rounded-lg w-full p-2"
                    :class="{ 'border-red-500': errors.number }"
                    placeholder="Masukkan nomor kamar..."
                />

                <p
                    v-if="errors.number"
                    class="text-red-500 font-semibold text-end"
                >
                    {{ errors.number }}
                </p>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                <label for="category_id" class="block capitalize"
                    >jenis kamar:</label
                >

                <select
                    name="category_id"
                    id="category_id"
                    v-model="payload.category_id"
                    class="text-black border rounded-lg w-full p-2 uppercase"
                    :class="{ 'border-red-500': errors.category }"
                >
                    <option value="" disabled>---pilih jenis---</option>
                    <option
                        v-for="category in roomCategories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>

                <p
                    v-if="errors.category"
                    class="text-red-500 font-semibold text-end"
                >
                    {{ errors.category }}
                </p>
            </div>
        </div>

        <div
            class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-2 gap-4"
        >
            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                <label for="status" class="block capitalize"
                    >status kamar:</label
                >

                <select
                    name="status"
                    id="status"
                    v-model="payload.status"
                    class="border rounded-lg w-full p-2 uppercase"
                    :class="{ 'border-red-500': errors.status }"
                >
                    <option value="" disabled>---pilih status---</option>
                    <option value="available">tersedia</option>
                    <option value="unavailable">tidak tersedia</option>
                </select>

                <p
                    v-if="errors.status"
                    class="text-red-500 font-semibold text-end"
                >
                    {{ errors.status }}
                </p>
            </div>

            <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                <label for="price" class="block capitalize"
                    >harga dasar kamar:</label
                >

                <div class="flex items-center gap-2">
                    <span class="capitalize text-gray-500">rp</span>

                    <input
                        type="number"
                        name="price"
                        id="price"
                        v-model="payload.price"
                        class="text-black border rounded-lg w-full p-2"
                        :class="{ 'border-red-500': errors.price }"
                        placeholder="Masukkan harga dasar kamar..."
                    />
                </div>

                <p
                    v-if="errors.price"
                    class="text-red-500 font-semibold text-end"
                >
                    {{ errors.price }}
                </p>
            </div>
        </div>

        <button
            class="tracking-widest text-white bg-indigo-500 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
            :onclick="() => createRoom()"
        >
            tambah
        </button>
    </div>
    <!-- </div>
    </div> -->
</template>

<script>
export default {
    name: "FormComponent",
    data() {
        return {
            title: "",
            roomCategories: [],
            payload: {
                number: null,
                category_id: "",
                status: "",
                price: null,
            },
            errors: {},
        };
    },
    mounted() {
        this.getCategories();
        // this.getRoom();
    },
    methods: {
        // async getRoom() {
        //     try {
        //         const res = await this.$axios.get(`/api/rooms/${8}`);

        //         console.log(res);
        //     } catch (err) {
        //         alert(err.message);
        //     }
        // },
        async getCategories() {
            try {
                const res = await this.$axios.get("/api/categories");
                const { data } = res.data;

                this.roomCategories = data;
            } catch (err) {
                alert(err.message);
            }
        },
        async createRoom() {
            this.errors = {};

            if (!this.payload.number)
                this.errors.number = "Nomor Kamar harus diisi.";
            if (!this.payload.category_id)
                this.errors.category = "Jenis Kamar harus diisi.";
            if (!this.payload.status)
                this.errors.status = "Status Kamar harus diisi.";
            if (!this.payload.price)
                this.errors.price = "Harga Kamar harus diisi.";

            if (Object.keys(this.errors).length > 0) return;

            try {
                await this.$axios.post("/api/rooms", this.payload);

                this.payload = {
                    number: null,
                    category: "",
                    status: "",
                    price: null,
                };
                this.errors = {};

                this.$router.push({
                    path: "/rooms",
                    query: { message: "Kamar berhasil ditambahkan." },
                });
            } catch (err) {
                this.errors.failed =
                    "Gagal menambahkan kamar baru. Silakan coba lagi.";
            }
        },
        // async updateRoom(id) {
        //     try {
        //         const res = await this.$axios.put(`/api/rooms/${id}`, this.payload);

        //         alert(res.data.message);
        //     } catch (err) {
        //         alert(err.message);
        //     }
        // },
    },
};
</script>
