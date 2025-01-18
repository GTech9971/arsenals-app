import apiClient from "@/lib/api-client";
import { useCallback } from "react"

export const useDeleteCategory = () => {
    const deleteCategory = useCallback(async (categoryId: string) => {
        const response = await apiClient.delete(`categories/${categoryId}`);
    }, []);

    return { deleteCategory };
}