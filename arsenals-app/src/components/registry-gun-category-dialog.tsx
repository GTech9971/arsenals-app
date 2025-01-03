import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api-client";
import { RegistryGunCategoryRequest, RegistryGunCategoryResponse } from "@gtech9971/arsenals.model";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

const formSchema = z.object({
    name: z.string().nonempty({ message: 'カテゴリー名は必須です。' }),
});

type FormValues = z.infer<typeof formSchema>;

export type RegistryGunCategoryDialogProps = {
    dismiss: (data?: string | null | undefined, role?: string) => void
}

export const RegistryGunCategoryDialog: React.FC<RegistryGunCategoryDialogProps> = ({ dismiss, }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormValues>({
        defaultValues: { name: '' },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (async (data: RegistryGunCategoryRequest) => {
        console.log(data);
        const request: RegistryGunCategoryRequest = {
            name: data.name
        };

        api.post<RegistryGunCategoryResponse>('categories', request).then(response => {
            console.log(response);
        });
    });

    return (
        <IonPage>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>カテゴリー登録</IonTitle>
                        <IonButtons slot="start">
                            <IonButton onClick={() => dismiss(null, 'cancel')}>Cancel</IonButton>
                        </IonButtons>

                        <IonButtons slot="end">
                            <IonButton type="submit">Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem lines="none">
                        <IonInput
                            label="カテゴリー名"
                            labelPlacement="stacked"
                            placeholder="ハンドガン"
                            errorText={errors.name?.message}
                            className={`${errors.name ? 'ion-invalid' : 'ion-valid'}`}
                            {...register('name')}
                        />
                    </IonItem>

                </IonContent>
            </form>
        </IonPage>
    )
}