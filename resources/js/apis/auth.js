// import axios from "axios";

export const getMe = async () => {
    return await $axios.get("/auth/me");
};

export const register = async (payload) => {
    return await $axios.post("/auth/register", payload);
};

export const login = async (payload) => {
    return await $axios.post("/auth/login", payload);
};

export const logout = async () => {
    return await $axios.post("/auth/logout");
};
