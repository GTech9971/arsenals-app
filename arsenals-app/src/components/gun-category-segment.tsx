import { SegmentedControl } from "./ui/segmented-control"
import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { FetchGunCategoryResponse, GunCategory } from "@gtech9971/arsenals.model";
import { RegistryGunCategoryDialog } from "./registry-gun-category-dialog";
import { HStack } from "@chakra-ui/react";


export type GunCategorySegmentProp = {
    onChange: (value: GunCategory | undefined) => void;
}

export const GunCategorySegment: React.FC<GunCategorySegmentProp> = ({ onChange }) => {

    const [selected, setSelected] = useState<string>('すべて');
    const [categories, setCategories] = useState<GunCategory[]>([{ id: 'all', name: 'すべて' }]);

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


    const handleSegmentChange = ((name: string) => {
        setSelected(name);
        onChange(categories.find(x => x.name === name));
    });

    if (!categories) { return <div>Loading...</div> }

    return (
        <>
            <HStack>
                <SegmentedControl
                    value={selected}
                    items={categories.map(x => x.name!)}
                    onValueChange={(e) => handleSegmentChange(e.value)} />

                <RegistryGunCategoryDialog />
            </HStack>
        </>
    )
}