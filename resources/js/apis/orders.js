import axios from "axios";

export const getAll = async () => {
    return await axios.get("/orders");
};

export const createOne = async (payload) => {
    return await axios.post("/orders", payload);
};

export const updateOne = async (id, payload) => {
    return await axios.put(`/orders/${id}`, payload);
};

export const deleteOne = async (id) => {
    return await axios.delete(`/orders/${id}`);
};
