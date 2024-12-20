<template>
    <div
        class="h-[100vh] flex items-center justify-center bg-sign-page bg-cover bg-left"
    >
        <RouterView @login="login" @register="register" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            payload: {
                name: null,
                email: null,
                password: null,
                role: null,
            },
        };
    },
    methods: {
        async login() {
            try {
                // const res = await this.$axios.post("/api/logout");

                console.log("login");
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
                    "/api/register",
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
