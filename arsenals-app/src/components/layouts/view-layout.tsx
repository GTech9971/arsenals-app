import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { GunCategorySegment } from "../gun-category-segment";
import { GunCard } from "../gun-card";
import { useCallback, useEffect, useState } from "react";
import { FetchGunsResponse, Gun, GunCategory } from "@gtech9971/arsenals.model";
import { api } from "@/lib/api-client";
import { Fab } from "../ui/fab";


export const ViewLayout = () => {

    const [guns, setGuns] = useState<Gun[]>([]);
    const [selectCategory, setSelectCategory] = useState<GunCategory | undefined>(undefined);

    // 初回実行時
    useEffect(() => {
        (async () => {
            const response = await api.get<FetchGunsResponse>('guns');
            if (response.data.data) {
                setGuns(response.data.data);
            }
        })()
    }, []);

    useEffect(() => {
        if (!selectCategory) { return; }

        const query: string = selectCategory.id === 'all'
            ? ``
            : `?category=${selectCategory.id}`;

        (async () => {
            const response = await api.get<FetchGunsResponse>(`guns${query}`)
            if (response.data.data) {
                setGuns(response.data.data);
            }
        })();
    }, [selectCategory]);


    const onChangeCategory = useCallback((value: GunCategory | undefined) => {
        setSelectCategory(value);
    }, []);



    return (
        <>
            <VStack>

                <GunCategorySegment onChange={onChangeCategory} />

                <Grid templateColumns="repeat(3, 1fr)" gap="3" >
                    {guns.map((gun, index) => (
                        <GridItem key={index} >
                            <GunCard {...gun} />
                        </GridItem>
                    ))}

                </Grid>

                <Fab />

            </VStack>
        </>
    )
}