import { api } from "@/lib/api-client";
import { Bullet, FetchBulletsResponse, FetchGunCategoryResponse, GunCategory, RegistryGunRequest, RegistryGunResponse } from "@gtech9971/arsenals.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    IonButton,
    IonCheckbox,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonList,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    useIonModal,
    useIonToast
} from "@ionic/react"
import { add } from "ionicons/icons"
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage } from '@hookform/error-message';
import { RegistryBulletDialog } from "@/components/registry-bullet-dialog";

const formSchema = z.object({
    name: z.string()
        .nonempty("名前は1文字以上です。")
        .min(1, "名前は1文字以上です。")
        .max(20, "名前は20文字以下です。"),
    categoryId: z.string()
        .nonempty("カテゴリーは必須です。"),
    capacity: z.preprocess((val) => parseInt(val as string),
        z.number({ message: '装弾数は数字で入力してください。' })
            .nonnegative("装弾数は1以上です。")
            .min(1, "装弾数は1以上です。")
            .max(5000, "装弾数は5000以下です。")
    ),

    useBullets: z.array(z.string())
        .optional()
});

type FormValues = z.infer<typeof formSchema>;

export type RegistryGunFormProps = {
    formId?: string,
    showSubmit?: boolean,
}

export const RegistryGunForm: React.FC<RegistryGunFormProps> = ({ formId, showSubmit }) => {

    const [categories, setCategories] = useState<GunCategory[]>([]);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [present] = useIonToast();
    const [presentDialog, dismiss] = useIonModal(RegistryBulletDialog, {
        dismiss: (data: string, role: string) => dismiss(data, role)
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: { name: '', categoryId: '', capacity: undefined, useBullets: [] },
        resolver: zodResolver(formSchema)
    });

    const selectBullets: string[] | undefined = watch('useBullets');

    useEffect(() => {
        (async () => {
            const response = await api.get<FetchGunCategoryResponse>("categories");
            if (!response.data.data) { return; }
            setCategories(response.data.data);
        })();

        (async () => {
            const response = await api.get<FetchBulletsResponse>("bullets");
            if (!response.data.data) { return; }
            setBullets(response.data.data);
        })();
    }, []);

    const toggleUseBullet = (bulletId: string) => {
        if (!selectBullets) { throw Error(); }
        const newVal = selectBullets.includes(bulletId)
            ? selectBullets.filter((x) => x !== bulletId)
            : [...selectBullets, bulletId];
        setValue('useBullets', newVal);
    }

    const onSubmit = ((data: FormValues) => {
        const request: RegistryGunRequest = {
            name: data.name,
            categoryId: data.categoryId,
            capacity: data.capacity,
            useBullets: data.useBullets
        };
        console.log(request);

        api.post<RegistryGunResponse>("guns", request).then(response => {
            console.log(response);
            present('銃を登録しました。')
        });
    });

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonImg />
                    </IonCol>

                    <IonCol size="6">
                        <IonList>
                            <IonItem>
                                <IonInput
                                    label="名前"
                                    labelPlacement="stacked"
                                    placeholder="G3A1"
                                    errorText={errors.name?.message}
                                    className={`${errors.name ? 'ion-invalid' : 'ion-valid'}`}
                                    {...register('name')}
                                />
                            </IonItem>

                            <IonItem>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <IonSelect
                                            label="カテゴリー"
                                            labelPlacement="stacked"
                                            placeholder="ハンドガン"
                                            className={`${errors.categoryId ? 'ion-invalid' : 'ion-valid'}`}
                                            value={field.value}
                                            onIonChange={e => setValue('categoryId', e.detail.value)}>

                                            {categories.map((category, index) => (
                                                <IonSelectOption key={index} value={category.id}>
                                                    {category.name}
                                                </IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    )} />

                                <ErrorMessage
                                    errors={errors}
                                    name="categoryId"
                                    as={<div style={{ color: 'red', fontSize: 'small' }} />} />
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="装弾数"
                                    labelPlacement="stacked"
                                    placeholder="30"
                                    errorText={errors.capacity?.message}
                                    className={`${errors.capacity ? 'ion-invalid' : 'ion-valid'}`}
                                    {...register('capacity')} />
                            </IonItem>

                        </IonList>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem onClick={() => presentDialog()}>
                                    <IonText style={{ display: 'flex', alignItems: 'center' }}>
                                        使用弾丸
                                        <IonButton fill="clear">
                                            <IonIcon slot="icon-only" icon={add} />
                                        </IonButton>
                                    </IonText>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            {bullets.map((bullet, index) => (
                                <IonCol size="4" key={index}>
                                    <IonCheckbox key={index}
                                        checked={selectBullets?.includes(bullet.id)}
                                        onIonChange={() => toggleUseBullet(bullet.id)}>
                                        {bullet.name}
                                    </IonCheckbox>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>

                </IonRow>

                {
                    showSubmit && <IonButton type="submit">Save</IonButton>
                }


            </IonGrid>
        </form>
    )
}