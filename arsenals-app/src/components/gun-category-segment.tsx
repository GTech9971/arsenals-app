import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { FetchGunCategoryResponse, GunCategory } from "@gtech9971/arsenals.model";
import { RegistryGunCategoryDialog } from "./registry-gun-category-dialog";
import { IonIcon, IonSegment, IonSegmentButton, useIonModal } from "@ionic/react";
import { SegmentValue } from "@ionic/core";
import { addOutline } from "ionicons/icons";

export type GunCategorySegmentProp = {
    /** 選択したカテゴリーID */
    onChange: (value?: string) => void;
}

export const GunCategorySegment: React.FC<GunCategorySegmentProp> = ({ onChange }) => {

    const [selected, setSelected] = useState<string>('all');
    const [categories, setCategories] = useState<GunCategory[]>([{ id: 'all', name: 'すべて' }]);
    const [present, dismiss] = useIonModal(RegistryGunCategoryDialog, {
        dismiss: (data: string, role: string) => dismiss(data, role)
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get<FetchGunCategoryResponse>('/categories');
            if (response.data.data) {
                const category: GunCategory[] = response.data.data;
                setCategories([{ id: 'all', name: 'すべて' }, ...category]);
            }
        };

        fetchData();
    }, []);


    const handleSegmentChange = ((value?: SegmentValue) => {
        if (!value) { return; }
        const category: string = value as string;
        setSelected(category);
        onChange(category);
    });

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

            <IonSegmentButton data-testid="open" onClick={() => present()}>
                <IonIcon icon={addOutline} />
            </IonSegmentButton>
        </IonSegment>
    )
}