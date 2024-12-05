import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";

// import Dashboard from "./layouts/Dashboard.vue";
import { Orders, Rooms } from "./views";
import { TableComponent, FormComponent } from "./components";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const routes = [
    // { path: "/", component: Dashboard },
    { path: "/orders", component: Orders },
    { path: "/rooms", component: Rooms },
    {
        path: "/rooms/create",
        component: FormComponent,
    },
    {
        path: "/rooms/update",
        component: FormComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.mount("#app");
