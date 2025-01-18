import apiClient from "@/lib/api-client";
import { FetchGunCategoryResponse, GunCategory } from "@gtech9971/arsenals.model";
import { useCallback } from "react"

export const useFetchCategories = () => {
    const fetchCategories = useCallback(async (): Promise<GunCategory[]> => {
        const response = await apiClient.get<FetchGunCategoryResponse>("categories");
        return response.data.data!;
    }, []);

    return { fetchCategories };
}