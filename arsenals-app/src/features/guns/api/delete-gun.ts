import apiClient from "@/lib/api-client";
import { useIonAlert, useIonToast } from "@ionic/react";
import { HttpStatusCode } from "axios";
import { useCallback } from "react";


export const useDeleteGun = () => {

    const [present] = useIonAlert();
    const [presentToast] = useIonToast();

    /** 銃の削除の確認 */
    const promptDeleteGun = useCallback((): Promise<boolean> => {
        return new Promise((resolve) => {
            present({
                message: "銃を削除します",
                buttons: [
                    { text: "はい", role: "confirm" },
                    { text: "いいえ", role: "cancel" },
                ],
                onDidDismiss: (e => {
                    resolve(e.detail.role === "confirm");
                }),
            })
        })
    }, [present]);

    /**
     * 銃を削除する
     * @param gunId 
     * @param isShowConfirm 
     * @returns 
     */
    const deleteGun = useCallback(async (gunId: string, isShowConfirm?: boolean) => {
        if (isShowConfirm && await promptDeleteGun() === false) { return; }

        const response = await apiClient.delete(`guns/${gunId}`);
        if (response.status === HttpStatusCode.NoContent) {
            await presentToast("銃を削除しました");
        }
    }, [presentToast, promptDeleteGun]);

    return { deleteGun };
}