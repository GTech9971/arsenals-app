import { useCallback, useEffect, useState } from "react";
import { GunCategory } from "@gtech9971/arsenals.model";
import { RegistryGunCategoryDialog } from "./registry-gun-category-dialog";
import { IonIcon, IonSegment, IonSegmentButton, useIonModal, useIonToast } from "@ionic/react";
import { SegmentValue } from "@ionic/core";
import { addOutline, trashOutline } from "ionicons/icons";
import { usePickupCategory } from "@/features/categories/hooks/use-category-pickup";
import { useDeleteCategory } from "@/features/categories/api/delete-category";
import { useFetchCategories } from "@/features/categories/api/fetch-categories";

export type GunCategorySegmentProp = {
    /** 選択したカテゴリーID */
    onChange: (value?: string) => void;
}

export const GunCategorySegment: React.FC<GunCategorySegmentProp> = ({ onChange }) => {

    const [selected, setSelected] = useState<string>('all');
    const [categories, setCategories] = useState<GunCategory[]>([{ id: 'all', name: 'すべて' }]);

    const { pickupCategory } = usePickupCategory();
    const { deleteCategory } = useDeleteCategory();
    const { fetchCategories } = useFetchCategories();

    const [presentToast] = useIonToast();
    const [present, dismiss] = useIonModal(RegistryGunCategoryDialog, {
        dismiss: (data: string, role: string) => {
            dismiss(data, role);
            if (role === 'confirm') {
                fetchData();
            }
        }
    });

    // 銃カテゴリー取得
    const fetchData = useCallback(async () => {
        const categories = await fetchCategories();
        setCategories([{ id: 'all', name: 'すべて' }, ...categories]);
    }, [fetchCategories]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleSegmentChange = ((value?: SegmentValue) => {
        if (!value) { return; }
        const category: string = value as string;
        setSelected(category);
        onChange(category);
    });

    const onClickAddButton = async () => {
        await present();
    };

    const onClickDeleteButton = async () => {
        const category: GunCategory | undefined = await pickupCategory("削除するカテゴリーを選択", "");
        if (!category) { return; }

        await deleteCategory(category.id!);
        await presentToast("カテゴリーを削除しました。");
        await fetchData();
        setSelected('all');

        console.debug(category);
    };


    if (!categories) { return <div>Loading...</div> }

    return (
        <IonSegment
            value={selected as SegmentValue}
            onIonChange={(e) => handleSegmentChange(e.detail.value)}>
            {categories.map((category, index) =>
            (
                <IonSegmentButton key={index} value={category.id}>
                    {category.name}
                </IonSegmentButton>
            )
            )}

            <IonSegmentButton data-testid="open" onClick={onClickAddButton}>
                <IonIcon icon={addOutline} />
            </IonSegmentButton>

            <IonSegmentButton data-testid="open" onClick={onClickDeleteButton}>
                <IonIcon icon={trashOutline} />
            </IonSegmentButton>
        </IonSegment>
    )
}