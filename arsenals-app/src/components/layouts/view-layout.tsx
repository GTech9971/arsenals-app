import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { GunCategorySegment } from "../gun-category-segment";
import { GunCard } from "../gun-card";
import { useEffect, useState } from "react";
import { FetchGunsResponse, Gun } from "@gtech9971/arsenals.model";
import { api } from "@/lib/api-client";


export const ViewLayout = () => {

    const [guns, setGuns] = useState<Gun[]>([]);

    useEffect(() => {
        api.get<FetchGunsResponse>('guns?category=C-1000').then(response => {
            if (response.data.data) {
                setGuns(response.data.data);
            }
        });
    }, []);

    return (
        <>
            <VStack>

                <GunCategorySegment />

                <Grid templateColumns="repeat(3, 1fr)" gap="3" >
                    {guns.map((gun, index) => (
                        <GridItem key={index} >
                            <GunCard {...gun} />
                        </GridItem>
                    ))}

                </Grid>

            </VStack>
        </>
    )
}