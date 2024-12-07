<template>
    <div
        class="p-6 rounded-lg bg-white grid grid-rows-[auto_auto_auto] grid-cols-1 gap-4"
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
                    v-model="activePayload.number"
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
                <label for="category-id" class="block capitalize"
                    >jenis kamar:</label
                >

                <select
                    name="category-id"
                    id="category-id"
                    v-model="activePayload.category_id"
                    class="text-black border rounded-lg w-full p-2 uppercase"
                    :class="{ 'border-red-500': errors.category }"
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
                    v-model="activePayload.status"
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
                        v-model="activePayload.price"
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
            @click="handleSubmit"
        >
            {{ currentPath === "/rooms/create" ? "tambah" : "ubah" }}
        </button>
    </div>
</template>

<script>
export default {
    name: "FormComponent",
    data() {
        return {
            localPayload: { ...this.payload },
        };
    },
    props: {
        categories: Array,
        payload: Object,
        errors: Object,
        currentPath: String,
    },
    computed: {
        mode() {
            return this.$route.path.includes("create") ? "create" : "update";
        },
        activePayload() {
            return this.mode === "create" ? this.payload : this.localPayload;
        },
    },
    created() {
        if (this.mode === "update" && this.$route.query.room) {
            const data = JSON.parse(this.$route.query.room);
            this.localPayload = { ...data };
        }
    },
    methods: {
        handleSubmit() {
            if (this.mode === "create") this.$emit("createRoom", this.payload);
            else this.$emit("updateRoom", this.localPayload);
        },
    },
};
</script>
