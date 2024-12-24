import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";

import { Dashboard, Sign } from "./layouts";
import { Login, Register, Orders, Rooms } from "./views";
import { TableComponent, FormComponent } from "./components";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "auth-token"
)}`;

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/",
        component: Sign,
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
            },
            {
                path: "register",
                name: "Register",
                component: Register,
            },
        ],
    },
    {
        path: "/",
        component: Dashboard,
        children: [
            {
                path: "orders",
                component: Orders,
                children: [
                    {
                        path: "",
                        name: "OrdersList",
                        component: TableComponent,
                    },
                    {
                        path: "create",
                        name: "CreateOrder",
                        component: FormComponent,
                    },
                    {
                        path: "update",
                        name: "UpdateOrder",
                        component: FormComponent,
                    },
                ],
            },
            {
                path: "rooms",
                component: Rooms,
                children: [
                    {
                        path: "",
                        name: "RoomsList",
                        component: TableComponent,
                    },
                    {
                        path: "create",
                        name: "CreateRoom",
                        component: FormComponent,
                    },
                    {
                        path: "update",
                        name: "UpdateRoom",
                        component: FormComponent,
                    },
                ],
            },
        ],
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
