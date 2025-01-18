import { Gun } from "@gtech9971/arsenals.model";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
} from "@ionic/react";
import { ReactNode } from "react";

export type GunCardProps = {
    gun: Gun,
    popover?: ReactNode,
}

export const GunCard: React.FC<GunCardProps> = ({ gun, popover }) => {

    return (
        <IonCard style={{ maxWidth: '320px', minHeight: '300px' }}>

            {popover}

            <IonImg src={gun.imageUrl} />
            <IonCardHeader>
                <IonCardTitle>
                    {gun.name}
                </IonCardTitle>
                <IonCardSubtitle>
                    {gun.category?.name}
                </IonCardSubtitle>

            </IonCardHeader>
            <IonCardContent>
                装弾数:{gun.capacity}
            </IonCardContent>
        </IonCard>
    )
}