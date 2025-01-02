import axios from "axios";

export const getAll = async () => {
    return await axios.get("/rooms");
};

export const createOne = async (payload) => {
    return await axios.post("/rooms", payload);
};

export const updateOne = async (payload) => {
    return await axios.put(`/rooms/${payload.id}`, payload);
};

export const deleteOne = async (id) => {
    return await axios.delete(`/rooms/${id}`);
};
