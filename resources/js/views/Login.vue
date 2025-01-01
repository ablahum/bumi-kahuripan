<template>
    <div class="md:w-2/3 lg:w-1/2 w-11/12 bg-white rounded-xl shadow-xl p-8">
        <div class="mb-4 text-center">
            <h3 class="font-bold uppercase text-2xl">login</h3>

            <p class="font-semibold mt-2">
                <span class="capitalize">silakan </span>masuk untuk melanjutkan
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
            <label for="email" class="block mb-2"
                ><span class="capitalize">alamat </span>email:</label
            >

            <input
                type="email"
                name="email"
                id="email"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.email }"
                placeholder="Your email..."
                v-model="payload.email"
            />

            <p v-if="errors.email" class="text-red-500 font-semibold text-end">
                {{ errors.email }}
            </p>
        </div>

        <div class="mb-4">
            <label for="password" class="block mb-2"
                ><span class="capitalize">kata </span>sandi:</label
            >

            <input
                type="password"
                name="password"
                id="password"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Your password..."
                v-model="payload.password"
            />

            <p
                v-if="errors.password"
                class="text-red-500 font-semibold text-end"
            >
                {{ errors.password }}
            </p>
        </div>

        <button
            class="tracking-widest text-white bg-indigo-700 font-semibold rounded-lg w-full px-4 py-2 text-center uppercase"
            @click="login"
        >
            masuk
        </button>

        <p class="text-center mt-4">
            <span class="capitalize">belum </span>memiliki akun?

            <RouterLink to="/register" class="text-indigo-700 font-semibold"
                ><span class="capitalize">buat </span>akun </RouterLink
            >sekarang
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            payload: {
                email: null,
                password: null,
            },
            message: {
                success: this.$route.query.message || null,
                failed: null,
            },
            errors: {},
        };
    },
    methods: {
        async login() {
            this.errors = {};

            if (!this.payload.email) this.errors.email = "Email harus diisi.";
            if (!this.payload.password)
                this.errors.password = "Password harus diisi.";

            try {
                const res = await this.$axios.post("/auth/login", this.payload);

                if (res.status === 201) {
                    this.message.success = `Masuk berhasil. Anda akan dialihkan dalam 5 detik.`;

                    localStorage.setItem("auth-token", res.data.token);
                    this.$axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${res.data.token}`;

                    this.payload = {
                        email: null,
                        password: null,
                    };
                    this.errors = {};

                    if (this.message) {
                        setTimeout(() => {
                            this.message = {};

                            this.$router.push("/rooms");
                        }, 5000);
                    }
                }
            } catch (err) {
                if (
                    err.response.data.message ===
                    "Email or password is incorrect. Please try again."
                ) {
                    this.message.failed =
                        "Email atau password salah. Silakan coba kembali.";
                } else if (
                    err.response.data.message ===
                    "The email field must be a valid email address."
                ) {
                    this.message.failed = "Format alamat email harus benar.";
                } else if (
                    err.response.data.message ===
                    "The provided credentials do not match our records."
                ) {
                    this.message.failed = "Akun belum terdaftar.";
                }
            }

            if (this.message) {
                setTimeout(() => {
                    this.message = {};
                }, 5000);
            }
        },
    },
};
</script>
