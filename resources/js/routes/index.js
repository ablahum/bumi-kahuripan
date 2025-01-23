import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from "../middlewares";
import { Dashboard, Sign } from "../layouts";
import { Login, Register, Orders, Rooms } from "../views";
import { TableComponent, FormComponent } from "../components";

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
                meta: { requiresUser: true },
            },
            {
                path: "register",
                name: "Register",
                component: Register,
                meta: { requiresUser: true },
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
                meta: { requiresAuth: true },
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
                meta: {
                    requiresAuth: true,
                    requiresRole: "admin",
                },
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

router.beforeEach(authMiddleware);

export default router;
