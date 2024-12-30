import { z } from "zod"
import { Button } from "./ui/button"
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { api } from "@/lib/api-client";
import { RegistryGunCategoryRequest, RegistryGunCategoryResponse } from "@gtech9971/arsenals.model";
import { toaster } from "./ui/toaster";

const formSchema = z.object({
    name: z.string().nonempty({ message: 'カテゴリー名は必須です。' }),
});

type FormValues = z.infer<typeof formSchema>;

export const RegistryGunCategoryDialog = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        formState
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const request: RegistryGunCategoryRequest = {
            name: data.name
        };

        api.post<RegistryGunCategoryResponse>('categories', request).then(response => {
            toaster.create({
                description: `銃カテゴリーを登録しました。${response.data.data?.id}`,
                type: 'success',
                duration: 1000,
                placement: 'top'
            });
            console.log(response);
        }).catch(error => {
            throw error;
        });
        setIsOpen(false);
    });

    return (

        <DialogRoot lazyMount placement='center' open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <DialogTrigger asChild>
                <Button>Open</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>カテゴリー登録</DialogTitle>
                </DialogHeader>

                <DialogBody>

                    <form id="form" onSubmit={onSubmit}>
                        {/* カテゴリー名 */}
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Field label="カテゴリー名" required>
                                    <Input placeholder="ハンドガン" {...field} />
                                    {formState.errors.name && (
                                        <span style={{ color: "red", fontSize: "12px" }}>
                                            {formState.errors.name.message}
                                        </span>
                                    )}
                                </Field>
                            )}>
                        </Controller>


                    </form>

                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button form="form" type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>

    )
}