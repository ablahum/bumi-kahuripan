<template>
    <div class="md:w-2/3 lg:w-1/2 w-11/12 bg-white rounded-xl shadow-xl p-8">
        <div class="mb-4 text-center">
            <h3 class="font-bold uppercase text-2xl">register</h3>

            <p class="font-semibold mt-2">
                <span class="capitalize">silakan </span>buat akun sebelum
                melanjutkan
            </p>
        </div>

        <div
            v-if="message && (message.success || message.failed)"
            class="py-2 px-4 rounded-lg my-4"
            :class="message.success ? 'bg-green-400' : 'bg-red-400'"
        >
            <p class="font-semibold">
                {{ message.success ? message.success : message.failed }}
            </p>
        </div>

        <div class="mb-4">
            <label for="name" class="block mb-2 capitalize">nama:</label>

            <input
                type="text"
                name="name"
                id="name"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Enter your name..."
                v-model="payload.name"
            />

            <p v-if="errors.name" class="text-red-500 font-semibold text-end">
                {{ errors.name }}
            </p>
        </div>

        <div class="mb-4">
            <label for="email" class="block mb-2"
                ><span class="capitalize">alamat </span>email:</label
            >

            <input
                type="email"
                name="email"
                id="email"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.email }"
                placeholder="Enter your email..."
                v-model="payload.email"
            />

            <p v-if="errors.email" class="text-red-500 font-semibold text-end">
                {{ errors.email }}
            </p>
        </div>

        <div class="mb-4">
            <label for="password" class="block mb-2"
                ><span class="capitalize">kata </span>sandi</label
            >

            <input
                type="password"
                name="password"
                id="password"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Enter your password..."
                v-model="payload.password"
            />

            <p
                v-if="errors.password"
                class="text-red-500 font-semibold text-end"
            >
                {{ errors.password }}
            </p>
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
                                { 'border-red-500': errors.role },
                            ]"
                        >
                            {{ role.name }}
                        </label>
                    </li>
                </ul>
            </div>

            <p v-if="errors.role" class="text-red-500 font-semibold text-end">
                {{ errors.role }}
            </p>
        </div>

        <button
            class="tracking-widest text-white bg-indigo-700 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
            @click="register"
        >
            buat akun
        </button>

        <p class="text-center mt-4">
            <span class="capitalize">sudah </span>punya akun?

            <RouterLink
                to="/login"
                class="capitalize text-indigo-700 font-semibold"
                >masuk </RouterLink
            >saja
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roles: [
                { id: 1, name: "admin" },
                { id: 2, name: "user" },
            ],
            payload: {
                name: null,
                email: null,
                password: null,
                role_id: null,
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
    },
    methods: {
        async register() {
            this.errors = {};

            if (!this.payload.name) this.errors.name = "Nama harus diisi.";
            if (!this.payload.email) this.errors.email = "Email harus diisi.";
            if (!this.payload.password)
                this.errors.password = "Password harus diisi.";
            if (!this.payload.role_id) this.errors.role = "Role harus diisi.";

            try {
                const res = await this.$axios.post(
                    "/auth/register",
                    this.payload
                );

                if (res.status === 201) {
                    this.message.success = `Buat akun berhasil. Anda akan dialihkan dalam 5 detik.`;

                    this.payload = {
                        name: null,
                        email: null,
                        password: null,
                        role_id: null,
                    };
                    this.errors = {};

                    if (this.message) {
                        setTimeout(() => {
                            this.message = {};

                            this.$router.push("/login");
                        }, 5000);
                    }
                }
            } catch (err) {
                if (
                    err.response.data.message ===
                    "The email has already been taken."
                ) {
                    this.message.failed = "Alamat email sudah terdaftar.";
                }

                if (this.message) {
                    setTimeout(() => {
                        this.message = {};
                    }, 5000);
                }
            }
        },
    },
};
</script>
