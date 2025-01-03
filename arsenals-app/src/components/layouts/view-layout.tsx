import { GunCategorySegment } from "../gun-category-segment";
import { GunCard } from "../gun-card";
import { useCallback, useEffect, useState } from "react";
import { FetchGunsResponse, Gun } from "@gtech9971/arsenals.model";
import { api } from "@/lib/api-client";
import { ContentLayout } from "./content-layout";
import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { add } from 'ionicons/icons';

export const ViewLayout = () => {

    const [guns, setGuns] = useState<Gun[]>([]);
    const [selectCategory, setSelectCategory] = useState<string | undefined>('all');

    // 初回実行時
    useEffect(() => {
        (async () => {
            const response = await api.get<FetchGunsResponse>('guns');
            if (response.data.data) {
                setGuns(response.data.data);
            }
        })()
    }, []);

    useEffect(() => {
        if (!selectCategory) { return; }

        const query: string = selectCategory === 'all'
            ? ``
            : `?category=${selectCategory}`;

        (async () => {
            const response = await api.get<FetchGunsResponse>(`guns${query}`)
            if (response.data.data) {
                setGuns(response.data.data);
            }
        })();
    }, [selectCategory]);


    const onChangeCategory = useCallback((value?: string) => {
        setSelectCategory(value);
    }, []);

    return (
        <ContentLayout title="Arsenals">
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <GunCategorySegment onChange={onChangeCategory} />
                    </IonCol>
                </IonRow>

                <IonRow>
                    {guns.map((gun, index) => (
                        <IonCol size="3">
                            <GunCard key={index} {...gun} />
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>

            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </ContentLayout>
    )
}