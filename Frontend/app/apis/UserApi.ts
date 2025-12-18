import { apiUrl } from "~/constants";
import axios from "axios";

const baseUrl = apiUrl + "/users";

export const getUsers = async () => {
    return await axios.get(baseUrl);
}

export const postUser = async (data: UserDTO) => {
    return await axios.post(baseUrl, data);
}

export const putUser = async (id: string, data: UserDTO) => {
    return await axios.put(baseUrl + "/" + id, data);
}

export const deleteUser = async (id: string) => {
    return await axios.delete(baseUrl + "/" + id);
}

export const getUsersDetails = async () => {
    return await axios.get(baseUrl + "/details");
}