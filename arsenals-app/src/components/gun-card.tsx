import { Gun } from "@gtech9971/arsenals.model";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg
} from "@ionic/react";

export const GunCard = (props: Gun) => {
    return (
        <IonCard style={{ width: '320px' }}>
            <IonImg src={props.imageUrl} />
            <IonCardHeader>
                <IonCardTitle>
                    {props.name}
                </IonCardTitle>
                <IonCardSubtitle>
                    {props.category?.name}
                </IonCardSubtitle>

            </IonCardHeader>
            <IonCardContent>
                装弾数:{props.capacity}
            </IonCardContent>
        </IonCard>
    )
}