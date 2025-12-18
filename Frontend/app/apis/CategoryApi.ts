import { apiUrl } from "~/constants";
import axios from "axios";

const baseUrl = apiUrl + "/categories";

export const getCategories = async () => {
    return await axios.get(baseUrl);
}

export const postCategory = async (data: CategoryDTO) => {
    return await axios.post(baseUrl, data);
}

export const putCategory = async (id: string, data: CategoryDTO) => {
    return await axios.put(baseUrl + "/" + id, data);
}

export const deleteCategory = async (id: string) => {
    return await axios.delete(baseUrl + "/" + id);
}

export const getCategoriesDetails = async () => {
    return await axios.get(baseUrl + "/details");
}