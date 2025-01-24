<template>
    <div class="p-6 rounded-lg bg-white">
        <div
            class="grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-4"
            v-if="
                currentPath === '/orders/create' ||
                currentPath === '/orders/update'
            "
        >
            <div
                class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto_auto] gap-4 items-start"
            >
                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="name" class="block capitalize"
                        >nama tamu:</label
                    >
                    <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="activePayload.guest.name"
                        class="text-black border rounded-lg w-full p-2"
                        :class="{ 'border-red-500': errors.name }"
                        placeholder="Masukkan nama tamu..."
                    />

                    <p
                        v-if="errors.name"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.name }}
                    </p>
                </div>

                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="origin" class="block capitalize"
                        >asal tamu:</label
                    >
                    <input
                        type="text"
                        name="origin"
                        id="origin"
                        v-model="activePayload.guest.origin"
                        class="text-black border rounded-lg w-full p-2"
                        :class="{ 'border-red-500': errors.origin }"
                        placeholder="Masukkan asal tamu..."
                    />

                    <p
                        v-if="errors.origin"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.origin }}
                    </p>
                </div>

                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="phone" class="block capitalize"
                        >nomor telepon tamu:</label
                    >
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        v-model="activePayload.guest.phone"
                        class="text-black border rounded-lg w-full p-2"
                        :class="{ 'border-red-500': errors.phone }"
                        placeholder="Masukkan nomor telepon tamu..."
                    />

                    <p
                        v-if="errors.phone"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.phone }}
                    </p>
                </div>
            </div>

            <div
                class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
            >
                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="start-date" class="block capitalize"
                        >tanggal masuk:</label
                    >

                    <div class="flex items-center gap-2">
                        <input
                            type="date"
                            name="start-date"
                            id="start-date"
                            v-model="activePayload.start_date"
                            class="text-black border rounded-lg w-full p-2"
                            :class="{ 'border-red-500': errors.start_date }"
                        />
                    </div>

                    <p
                        v-if="errors.start_date"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.start_date }}
                    </p>
                </div>

                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="end-date" class="block capitalize"
                        >tanggal keluar:</label
                    >

                    <div class="flex items-center gap-2">
                        <input
                            type="date"
                            name="end-date"
                            id="end-date"
                            v-model="activePayload.end_date"
                            class="text-black border rounded-lg w-full p-2"
                            :class="{ 'border-red-500': errors.end_date }"
                        />
                    </div>

                    <p
                        v-if="errors.end_date"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.end_date }}
                    </p>
                </div>
            </div>

            <div
                class="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-[auto_auto] gap-4 items-start"
            >
                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="room-id" class="block capitalize"
                        >nomor kamar:</label
                    >

                    <select
                        name="room-id"
                        id="room-id"
                        v-model="activePayload.room_id"
                        class="text-black border rounded-lg w-full p-2 uppercase"
                        :class="{ 'border-red-500': errors.room_id }"
                    >
                        <option value="" disabled>---pilih kamar---</option>
                        <option
                            v-for="room in rooms"
                            :key="room.id"
                            :value="room.id"
                        >
                            {{ room.number }}
                        </option>
                    </select>

                    <p
                        v-if="errors.room_id"
                        class="text-red-500 font-semibold text-end"
                    >
                        {{ errors.room_id }}
                    </p>
                </div>

                <div class="grid grid-cols-1 grid-rows-[auto_auto] gap-2">
                    <label for="total-price" class="block capitalize"
                        >total harga:</label
                    >

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
            </div>

            <button
                class="tracking-widest text-white bg-indigo-500 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
                @click="handleSubmit"
            >
                {{ currentPath === "/orders/create" ? "tambah" : "ubah" }}
            </button>
        </div>

        <div
            class="grid grid-rows-[auto_auto_auto] grid-cols-1 gap-4"
            v-if="
                currentPath === '/rooms/create' ||
                currentPath === '/rooms/update'
            "
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
                    <label for="number" class="block capitalize"
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
    </div>
</template>

<script>
import { getOne } from "../apis/rooms";
import countPrice from "../utils/countPrice";
import formatPrice from "../utils/formatPrice";

export default {
    name: "FormComponent",
    data() {
        return {
            updatePayload: {},
            rooms: [],
        };
    },
    props: {
        listRooms: Array,
        categories: Array,
        payload: Object,
        errors: Object,
        currentPath: String,
    },
    watch: {
        "payload.room_id": "updateTotalPrice",
        "payload.start_date": "updateTotalPrice",
        "payload.end_date": "updateTotalPrice",
        "updatePayload.room_id": "updateTotalPrice",
        "updatePayload.start_date": "updateTotalPrice",
        "updatePayload.end_date": "updateTotalPrice",
        listRooms: {
            immediate: true,
            handler(newVal) {
                this.updateRooms(newVal);
            },
        },
        $route: {
            immediate: true,
            handler() {
                this.initializeUpdatePayload();
                this.updateRooms(this.listRooms);
            },
        },
    },
    computed: {
        mode() {
            return this.currentPath.includes("create") ? "create" : "update";
        },
        activePayload() {
            return this.mode === "create" ? this.payload : this.updatePayload;
        },
        formatTotalPrice() {
            if (this.mode === "create")
                return formatPrice(this.payload.total_price);
            else return formatPrice(this.updatePayload.total_price);
        },
    },
    created() {
        this.initializeUpdatePayload();
        this.updateRooms(this.listRooms);
    },
    methods: {
        initializeUpdatePayload() {
            if (
                this.mode === "update" &&
                (this.$route.query.room || this.$route.query.order)
            ) {
                let data;

                if (this.currentPath.includes("orders"))
                    data = JSON.parse(this.$route.query.order);
                else data = JSON.parse(this.$route.query.room);

                this.updatePayload = { ...data };
            }
        },
        updateRooms(newListRooms) {
            this.rooms = [...newListRooms];

            if (
                this.mode === "update" &&
                this.updatePayload.room &&
                !this.rooms.find(
                    (room) => room.id === this.updatePayload.room.id
                )
            )
                this.rooms.push(this.updatePayload.room);
        },
        async updateTotalPrice() {
            const { room_id, start_date, end_date } = this.activePayload;

            if (start_date && end_date && room_id) {
                try {
                    const res = await getOne(room_id);

                    this.activePayload.total_price = countPrice(
                        res.data.room.price,
                        start_date,
                        end_date
                    );
                } catch (err) {
                    console.log(err);
                }
            } else {
                this.activePayload.total_price = 0;
            }
        },
        handleSubmit() {
            if (this.mode === "create") {
                if (this.currentPath.includes("orders")) {
                    this.$emit("createOrder");
                } else {
                    this.$emit("createRoom");
                }
            } else {
                if (this.currentPath.includes("orders")) {
                    this.$emit("updateOrder", this.activePayload);
                } else {
                    this.$emit("updateRoom", this.activePayload);
                }
            }
        },
    },
};
</script>
