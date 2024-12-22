<template>
    <div>
        <RouterView />
    </div>
</template>

<!-- <script>
export default {
    data() {
        return {
            sidebarOpen: false,
        };
    },
    methods: {
        async logout() {
            try {
                const res = await this.$axios.post("/api/logout");

                console.log(res);
                // localStorage.removeItem("token");
                // this.$router.push("/login");
            } catch (err) {
                console.error(err.response.data);
            }
        },
    },
};
</script> -->
