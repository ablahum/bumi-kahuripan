import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";

import { Orders, Rooms } from "./views";
import { TableComponent, FormComponent } from "./components";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const routes = [
    {
        path: "/orders",
        component: Orders,
        children: [
            {
                path: "",
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
        path: "/rooms",
        component: Rooms,
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: "",
                component: TableComponent,
                // props: { rooms: [] },
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: "create",
                name: "CreateRoom",
                component: FormComponent,
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: "update",
                name: "UpdateRoom",
                component: FormComponent,
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
