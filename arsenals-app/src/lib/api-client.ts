import { env } from "@/config/env";
import { oktaConfig } from "@/OktaConfig";
import OktaAuth from "@okta/okta-auth-js";
import Axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = Axios.create({
    baseURL: env.API_URL
});

const oktaAuth = new OktaAuth(oktaConfig);

apiClient.interceptors.request.use(async (config) => {
    const accessToken = await oktaAuth.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


export default apiClient;