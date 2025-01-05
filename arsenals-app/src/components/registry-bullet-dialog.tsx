import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegistryBulletRequest, RegistryBulletResponse } from "@gtech9971/arsenals.model";
import { api } from "@/lib/api-client";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

const formSchema = z.object({
    name: z.string()
        .nonempty({ message: '弾丸名は必須です。' }),
    damage: z.preprocess((val) => parseInt(val as string),
        z.number({ message: 'ダメージは数字で入力してください。' })
            .min(1, "ダメージは1以上です。")
            .max(5000, "ダメージは5000以下です。"))
});

type FormValues = z.infer<typeof formSchema>;

export type RegistryBulletDialogProps = {
    dismiss: (data?: string | null | undefined, role?: string) => void;
}

export const RegistryBulletDialog: React.FC<RegistryBulletDialogProps> = ({ dismiss }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormValues>({
        defaultValues: { name: '', damage: undefined },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = ((data: RegistryBulletRequest) => {
        const request: RegistryBulletRequest = {
            name: data.name,
            damage: data.damage
        };
        console.log(request);
        api.post<RegistryBulletResponse>("bullets", request).then(response => {
            console.log(response);
        });
    });

    return (
        <IonPage>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => dismiss(null, 'cancel')}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>弾丸登録</IonTitle>
                        <IonButtons slot="end">
                            <IonButton type="submit">Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList>
                        <IonItem lines="none">
                            <IonInput
                                label="弾丸名"
                                labelPlacement="stacked"
                                placeholder="9mm"
                                errorText={errors.name?.message}
                                className={`${errors.name ? 'ion-invalid' : 'ion-valid'}`}
                                {...register('name')}
                            />
                        </IonItem>

                        <IonItem lines="none">
                            <IonInput
                                label="ダメージ"
                                labelPlacement="stacked"
                                type="number"
                                placeholder="12"
                                errorText={errors.damage?.message}
                                className={`${errors.damage ? 'ion-invalid' : 'ion-valid'}`}
                                {...register('damage')}
                                data-testid="input-damage"
                            />
                        </IonItem>

                    </IonList>
                </IonContent>
            </form>
        </IonPage>
    )
}