<template>
    <div
        class="h-[100vh] flex items-center justify-center bg-sign-page bg-cover bg-left"
    >
        <RouterView />
    </div>
</template>

<script>
export default {
    data() {
        return {
            payload: {},
        };
    },
    // mounted() {
    // },
};
</script>
