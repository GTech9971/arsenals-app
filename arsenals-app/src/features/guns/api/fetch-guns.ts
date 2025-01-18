import apiClient from "@/lib/api-client"
import { FetchGunsResponse, Gun } from "@gtech9971/arsenals.model"
import { useCallback } from "react"


export const useFetchGuns = () => {
    const fetchGuns = useCallback(async (): Promise<Gun[]> => {
        const response = await apiClient.get<FetchGunsResponse>(`guns`);
        return response.data.data!;
    }, []);

    return { fetchGuns };
}