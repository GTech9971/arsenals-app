import { GunCard } from "@/components/gun-card"
import { ContentLayout } from "@/components/layouts/content-layout"
import { RegistryGunForm } from "@/features/registry-guns/registry-gun-form";
import { Gun } from "@gtech9971/arsenals.model";
import {
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonListHeader,
    IonRow,
    IonText
} from "@ionic/react"
import { useState } from "react";

export const RegistryGun = () => {

    const [gun, setGun] = useState<Gun | undefined>(undefined);

    return (
        <ContentLayout title="銃登録">
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <RegistryGunForm setGun={setGun} />
                    </IonCol>

                    <IonCol size="6" >
                        <IonList>
                            <IonListHeader>
                                <IonText>プレビュー</IonText>
                            </IonListHeader>
                            <IonItem>
                                <GunCard {...gun} />
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </ContentLayout>
    )
}