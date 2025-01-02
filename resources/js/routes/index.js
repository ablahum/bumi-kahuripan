import { createRouter, createWebHistory } from "vue-router";

import { me } from "../apis/auth";
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
                meta: { requiresGuest: true },
            },
            {
                path: "register",
                name: "Register",
                component: Register,
                meta: { requiresGuest: true },
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

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("auth-token");

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) return next({ path: "/login" });

        try {
            const res = await me();
            const user = res.data.user;

            if (
                to.matched.some(
                    (record) =>
                        record.meta.requiresRole &&
                        record.meta.requiresRole !== user.role.name
                )
            ) {
                return next({ path: "/orders" });
            }

            next();
        } catch (err) {
            return next({ path: "/rooms" });
        }

        // next();
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (token) return next({ path: "/orders" });

        next();
    } else {
        next();
    }
});

export default router;
