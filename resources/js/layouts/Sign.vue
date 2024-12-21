<template>
    <div
        class="h-[100vh] flex items-center justify-center bg-sign-page bg-cover bg-left"
    >
        <RouterView
            @login="login"
            :payload="payload"
            :roles="roles"
            @register="register"
        />
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
                // name: null,
                email: null,
                password: null,
                // role: null,
            },
        };
    },
    mounted() {
        // this.getRoles();
    },
    methods: {
        // async getRoles() {
        //     try {
        //         const res = await this.$axios.get("/api/roles");

        //         console.log(res);
        //     } catch (err) {
        //         console.error(err.response.data);
        //     }
        // },
        async login() {
            try {
                const res = await this.$axios.post(
                    "/api/auth/login",
                    this.payload
                );

                console.log(res);
                // console.log(res);
                // localStorage.removeItem("token");
                // this.$router.push("/login");
            } catch (err) {
                console.error(err.response.data);
            }
        },
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
