<template>
    <div class="flex flex-col">
        <div
            class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
            <table class="min-w-full">
                <thead>
                    <tr>
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
                            <button
                                class="text-indigo-500 hover:text-indigo-900 uppercase"
                            >
                                <RouterLink
                                    :to="{
                                        name: 'UpdateRoom',
                                        query: { room: JSON.stringify(room) },
                                    }"
                                    class="m-0"
                                >
                                    ubah
                                </RouterLink>
                            </button>

                            <button
                                class="text-red-500 hover:text-indigo-900 uppercase"
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
export default {
    name: "TableComponent",
    props: {
        rooms: Array,
        message: Object,
        deleteRoom: Function,
    },
};
</script>
