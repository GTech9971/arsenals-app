import { AlertButton, AlertInput, useIonAlert } from "@ionic/react";
import { useFetchCategories } from "../api/fetch-categories";
import { useCallback } from "react";
import { GunCategory } from "@gtech9971/arsenals.model";

export const usePickupCategory = () => {
    const [presentAlert] = useIonAlert();
    const { fetchCategories } = useFetchCategories();


    const pickupCategory = useCallback(async (header: string = "カテゴリーを選択", message: string = ""): Promise<GunCategory | undefined> => {
        const categories = await fetchCategories();

        return new Promise((resolve) => {
            const ok: AlertButton = {
                text: 'OK',
                role: 'confirm',
                handler: (value: string) => {
                    resolve(categories.find(x => x.id === value));
                }
            }
            const cancel: AlertButton = {
                text: 'Cancel',
                role: 'cancel',
                handler: () => resolve(undefined)
            };

            presentAlert({
                header: header,
                message: message,
                buttons: [ok, cancel],
                inputs: categories.map(val => {
                    const alertInput: AlertInput = { type: 'radio', label: val.name, value: val.id };
                    return alertInput
                }),
            })
        });
    }, [fetchCategories, presentAlert]);

    return { pickupCategory };
}