import { env } from "@/config/env";
import Axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = Axios.create({
    baseURL: env.API_URL
});