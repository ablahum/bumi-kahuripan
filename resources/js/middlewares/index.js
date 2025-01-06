// // import router from "../routes";
// import { getMe } from "../apis/auth";

// export const auth = (router) => {
//     router.beforeEach(async (to, from, next) => {
//         const token = localStorage.getItem("auth-token");

//         if (to.matched.some((record) => record.meta.requiresAuth)) {
//             if (!token) return next({ path: "/login" });

//             try {
//                 const res = await getMe();
//                 const user = res.data.user;

//                 if (
//                     to.matched.some(
//                         (record) =>
//                             record.meta.requiresRole &&
//                             record.meta.requiresRole !== user.role.name
//                     )
//                 ) {
//                     return next({ path: "/orders" });
//                 }

//                 next();
//             } catch (err) {
//                 return next({ path: "/rooms" });
//             }
//         } else if (to.matched.some((record) => record.meta.requiresUser)) {
//             if (token) return next({ path: "/orders" });

//             next();
//         } else {
//             next();
//         }
//     });
// };
