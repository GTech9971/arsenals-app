import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/api-client";
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
    IonToolbar,
    useIonToast
} from "@ionic/react";

const formSchema = z.object({
    name: z.string().nonempty({ message: 'カテゴリー名は必須です。' }),
});

type FormValues = z.infer<typeof formSchema>;

export type RegistryGunCategoryDialogProps = {
    dismiss: (data?: string | null | undefined, role?: 'cancel' | 'confirm') => void
}

export const RegistryGunCategoryDialog: React.FC<RegistryGunCategoryDialogProps> = ({ dismiss, }) => {

    const [present] = useIonToast();

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormValues>({
        defaultValues: { name: '' },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (async (data: RegistryGunCategoryRequest) => {
        const request: RegistryGunCategoryRequest = { name: data.name };

        const response = await apiClient.post<RegistryGunCategoryResponse>('categories', request);
        await present(`カテゴリーを登録しました。${response.data.data?.id}`);
        dismiss(null, 'confirm');
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
                            role="textbox"
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