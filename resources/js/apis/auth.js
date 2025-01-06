import axios from "axios";

export const getMe = () => {
    return axios.get("/auth/me");
};

export const register = (payload) => {
    return axios.post("/auth/register", payload);
};

export const login = (payload) => {
    return axios.post("/auth/login", payload);
};

export const logout = () => {
    return axios.post("/auth/logout");
};
