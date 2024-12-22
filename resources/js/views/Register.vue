<template>
    <div class="md:w-2/3 lg:w-1/2 w-11/12 bg-white rounded-xl shadow-xl p-8">
        <div class="mb-4 text-center">
            <h3 class="font-bold uppercase text-2xl">register</h3>

            <p class="font-semibold mt-2">
                <span class="capitalize">please </span>register before continue
            </p>
        </div>

        <div class="mb-4">
            <label for="name" class="block mb-2 capitalize">name:</label>

            <input
                type="text"
                name="name"
                id="name"
                class="text-black border rounded-lg w-full p-2"
                placeholder="Enter your name..."
                v-model="payload.name"
            />

            <!-- @error('name')
            <p class="text-red-500 font-semibold text-end">{{ $message }}</p>
            @enderror -->
        </div>

        <div class="mb-4">
            <label for="email" class="block mb-2"
                ><span class="capitalize">email </span>address:</label
            >

            <input
                type="email"
                name="email"
                id="email"
                class="text-black border rounded-lg w-full p-2"
                placeholder="Enter your email..."
                v-model="payload.email"
            />

            <!-- @error('email')
            <p class="text-red-500 font-semibold text-end">{{ $message }}</p>
            @enderror -->
        </div>

        <div class="mb-4">
            <label for="password" class="block mb-2 capitalize"
                >password:</label
            >

            <input
                type="password"
                name="password"
                id="password"
                class="text-black border rounded-lg w-full p-2"
                placeholder="Enter your password..."
                v-model="payload.password"
            />

            <!-- @error('password')
            <p class="text-red-500 font-semibold text-end">{{ $message }}</p>
            @enderror -->
        </div>

        <div class="mb-4 flex justify-center flex-col">
            <div class="flex gap-2 h-100">
                <label for="role" class="block capitalize">role:</label>

                <ul class="flex text-black">
                    <li v-for="role in roles" :key="role.id">
                        <input
                            type="radio"
                            name="roles"
                            :id="'role-' + role.id"
                            :value="role.id"
                            v-model="payload.role_id"
                            class="hidden peer"
                        />

                        <label
                            :for="'role-' + role.id"
                            class="py-1 px-2 uppercase bg-white border cursor-pointer"
                            :class="[
                                'transition-colors',
                                'peer-checked:bg-indigo-700 peer-checked:text-white',
                                role.id == 1 ? 'rounded-l-lg' : 'rounded-r-lg',
                            ]"
                        >
                            {{ role.name }}
                        </label>
                    </li>
                </ul>
            </div>

            <!-- @error('role_id')
            <p class="text-red-500 font-semibold self-end">{{ $message }}</p>
            @enderror -->
        </div>

        <button
            class="tracking-widest text-white bg-indigo-700 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
            @click="register"
        >
            register
        </button>

        <p class="text-center mt-4">
            <span class="capitalize">already </span>have an account?

            <RouterLink
                to="/auth/login"
                class="capitalize text-indigo-700 font-semibold"
                >login </RouterLink
            >instead
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roles: [
                { id: 1, name: "user" },
                { id: 2, name: "admin" },
            ],
            payload: {
                name: null,
                email: null,
                password: null,
                role_id: null,
            },
        };
    },
    methods: {
        async register() {
            try {
                const res = await this.$axios.post(
                    "/api/auth/register",
                    this.payload
                );

                console.log(res);
            } catch (err) {
                console.error(err.response.data);
            }
        },
    },
};
</script>
