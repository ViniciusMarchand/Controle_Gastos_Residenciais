import { apiUrl } from "~/constants";
import axios from "axios";

const baseUrl = apiUrl + "/transactions";

export const getTransactions = async () => {
    return await axios.get(baseUrl);
}

export const postTransaction = async (data: TransactionDTO) => {
    return await axios.post(baseUrl, data);
}

export const putTransaction = async (id: string, data: TransactionDTO) => {
    return await axios.put(baseUrl + "/" + id, data);
}

export const deleteTransaction = async (id: string) => {
    return await axios.delete(baseUrl + "/" + id);
}