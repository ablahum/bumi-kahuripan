<template>
    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex justify-between">
                <h3 class="text-3xl font-semibold text-gray-700 capitalize">
                    <!-- {{ title }} -->
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

            <!-- <div
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
                    <!-- <div
                        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md sm:rounded-lg"
                    > -->
                    <router-view></router-view>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>
