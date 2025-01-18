import { GunCard } from "@/components/gun-card"
import { ContentLayout } from "@/components/layouts/content-layout"
import { RegistryGunForm } from "@/features/guns/components/registry-guns/registry-gun-form";
import { Gun } from "@gtech9971/arsenals.model";
import {
    IonBackButton,
    IonButton,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonListHeader,
    IonRow,
    IonText
} from "@ionic/react"
import { useState } from "react";

const formId: string = "registryGunForm";

const RegistryGunLeftToolbar = () => {
    return (
        <IonBackButton defaultHref="view"></IonBackButton>
    )
}

const RegistryGunRightToolbar = () => {
    return (
        <IonButton type="submit" form={formId}>Save</IonButton>
    )
}

export const RegistryGun = () => {

    const [gun, setGun] = useState<Gun | undefined>(undefined);

    return (
        <ContentLayout
            title="銃登録"
            leftToolbar={<RegistryGunLeftToolbar />}
            rightToolbar={<RegistryGunRightToolbar />}
        >
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <RegistryGunForm formId={formId} setGun={setGun} />
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