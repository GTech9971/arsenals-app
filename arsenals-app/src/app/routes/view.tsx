import { GunCategorySegment } from "../../components/gun-category-segment";
import { GunCard } from "../../components/gun-card";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { FetchGunsResponse, Gun } from "@gtech9971/arsenals.model";
import apiClient from "@/lib/api-client";
import { ContentLayout } from "../../components/layouts/content-layout";
import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";
import { add, trashOutline } from 'ionicons/icons';
import { useHistory } from "react-router";
import { useDeleteGun } from "@/features/guns/api/delete-gun";
import { Popover } from "@/components/popover";
import { useFetchGuns } from "@/features/guns/api/fetch-guns";

type GunCardPopoverProp = {
    gun: Gun,
    deleteHandler: (gunId: string) => void,
};

const GunCardPopover = forwardRef<HTMLIonPopoverElement, GunCardPopoverProp>((props, ref) => {

    return (
        <Popover ref={ref} popoverId={`card-pop-${props.gun.id}`} color="primary">
            <IonItem onClick={() => props.deleteHandler(props.gun.id!)} button detail={false} lines="none">
                <IonLabel color="danger">削除</IonLabel>
                <IonIcon color="danger" slot="end" icon={trashOutline} />
            </IonItem>
        </Popover>
    )
});

export const View = () => {
    const history = useHistory();
    const [guns, setGuns] = useState<Gun[]>([]);
    const [selectCategory, setSelectCategory] = useState<string | undefined>('all');
    const { deleteGun } = useDeleteGun();
    const { fetchGuns } = useFetchGuns();
    const popRef = useRef<HTMLIonPopoverElement>(null);

    // 初回実行時
    useEffect(() => {
        (async () => {
            const guns = await fetchGuns();
            setGuns(guns);
        })()
    }, [fetchGuns]);

    useEffect(() => {
        if (!selectCategory) { return; }

        const query: string = selectCategory === 'all'
            ? ``
            : `?category=${selectCategory}`;

        (async () => {
            const response = await apiClient.get<FetchGunsResponse>(`guns${query}`)
            if (response.data.data) {
                setGuns(response.data.data);
            }
        })();
    }, [selectCategory]);


    const onChangeCategory = useCallback((value?: string) => {
        setSelectCategory(value);
    }, []);

    /**
     * 銃削除処理
     * @param gunId 
     */
    const deleteHandler = async (gunId: string) => {
        await deleteGun(gunId, true);
        await popRef.current?.dismiss();
        const guns = await fetchGuns();
        setGuns(guns);
    }

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
                        <IonCol key={index} size="3">
                            <GunCard
                                key={index}
                                gun={gun}
                                popover={
                                    <GunCardPopover
                                        ref={popRef}
                                        gun={gun}
                                        deleteHandler={deleteHandler} />}
                            />
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>

            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton onClick={() => history.push('/registry')}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </ContentLayout>
    )
}