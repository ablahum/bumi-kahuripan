import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";

// Import layouts
// import { Dashboard, Sign } from "./layouts";
import Dashboard from "./layouts/Dashboard.vue";
import Sign from "./layouts/Sign.vue";

// Import views
import { Login, Register, Orders, Rooms } from "./views";
// import Login from "./views/Login.vue";
// import Register from "./views/Register.vue";
// import Orders from "./views/Orders.vue";
// import Rooms from "./views/Rooms.vue";

// Import components
import TableComponent from "./components/TableComponent.vue";
import FormComponent from "./components/FormComponent.vue";

// Set default base URL for axios
axios.defaults.baseURL = "http://127.0.0.1:8000";

// Define routes
const routes = [
    {
        path: "/",
        redirect: "/auth/login", // Default redirect to login
    },
    {
        path: "/auth",
        component: Sign, // Layout for unauthenticated users
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
        path: "/home",
        component: Dashboard, // Layout for authenticated users
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
