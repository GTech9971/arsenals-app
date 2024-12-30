import { SegmentedControl } from "./ui/segmented-control"
import { z } from "zod"
import { api } from "@/lib/api-client";
import { Controller, useForm } from "react-hook-form"
import { IoMdAdd } from "react-icons/io";
import { IconButton } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FetchGunCategoryResponse } from "@gtech9971/arsenals.model";

const formSchema = z.object({
    category: z.string({ message: 'required' }),
})

type FormValues = z.infer<typeof formSchema>;

export const GunCategorySegment = () => {

    const [categories, setCategories] = useState<string[]>(['すべて']);


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get<FetchGunCategoryResponse>('/categories');
            if (response.data.data) {
                const category: string[] = response.data.data.map(x => x.name!);
                setCategories(['すべて', ...category]);
            }
        };

        fetchData();
    }, []);

    const {
        handleSubmit,
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
                        items={categories}
                        onValueChange={({ value }) => field.onChange(value)}
                    />
                )}>

            </Controller>

            <IconButton variant='subtle'>
                <IoMdAdd />
            </IconButton>

        </form >
    )
}