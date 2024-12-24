<template>
    <div class="md:w-2/3 lg:w-1/2 w-11/12 bg-white rounded-xl shadow-xl p-8">
        <div class="mb-4 text-center">
            <h3 class="font-bold uppercase text-2xl">login</h3>

            <p class="font-semibold mt-2">
                <span class="capitalize">please </span>login before continue
            </p>
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

        <div class="mb-4">
            <label for="email" class="block mb-2"
                ><span class="capitalize">email </span>address:</label
            >

            <input
                type="email"
                name="email"
                id="email"
                class="text-black border rounded-lg w-full p-2"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Your email..."
                v-model="payload.email"
            />

            <p v-if="errors.email" class="text-red-500 font-semibold text-end">
                {{ errors.email }}
            </p>
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
            login
        </button>

        <p class="text-center mt-4">
            <span class="capitalize">don't </span>have an account?

            <RouterLink
                to="/register"
                class="capitalize text-indigo-700 font-semibold"
                >register </RouterLink
            >now
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
    mounted() {
        if (this.message) {
            setTimeout(() => {
                this.message = {};
            }, 5000);
        }
    },
    methods: {
        async login() {
            this.errors = {};

            if (!this.payload.email) this.errors.email = "Email harus diisi.";
            if (!this.payload.password)
                this.errors.password = "Password harus diisi.";

            try {
                const res = await this.$axios.post("/auth/login", this.payload);

                this.payload = {
                    email: null,
                    password: null,
                };
                this.errors = {};

                if (res.status === 200) {
                    // this.message.success = "Masuk berhasil.";
                    alert(res.data.message);

                    localStorage.setItem("auth-token", res.data.token);
                    this.$router.push("/rooms");
                }
            } catch (err) {
                console.error(err.response.data);
            }
        },
    },
};
</script>
