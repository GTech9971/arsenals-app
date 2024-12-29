import { SegmentedControl } from "./ui/segmented-control"
import { z } from "zod"
import { api } from "@/lib/api-client";
import { Controller, useForm } from "react-hook-form"
import { Button } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FetchGunCategoryResponse } from "@gtech9971/arsenals.model";

const formSchema = z.object({
    category: z.string({ message: 'required' }),
})

type FormValues = z.infer<typeof formSchema>;

export const GunCategorySegment = () => {

    const [categories, setCategories] = useState<FetchGunCategoryResponse | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get<FetchGunCategoryResponse | null>('/categories');
            if (data?.data) {
                setCategories(data.data);
            }
        };

        fetchData();
    }, []);

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormValues>({
        defaultValues: undefined,
        resolver: zodResolver(formSchema)
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    if (!categories) { return <div>Loading...</div> }

    return (
        <form onSubmit={onSubmit}>
            <Controller
                control={control}
                name="category"
                render={({ field }) => (
                    <SegmentedControl
                        onBlurCapture={field.onBlur}
                        name={field.name}
                        value={field.value}
                        items={categories.data?.map(x => x.name) as string[]}
                        onValueChange={({ value }) => field.onChange(value)}
                    />
                )}>

            </Controller>

            <Button size="sm" type="submit">
                Submit
            </Button>
        </form >
    )
}