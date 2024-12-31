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
import { IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { api } from "@/lib/api-client";
import { RegistryGunCategoryRequest, RegistryGunCategoryResponse } from "@gtech9971/arsenals.model";
import { IoMdAdd } from "react-icons/io";

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
        defaultValues: { name: '' },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const request: RegistryGunCategoryRequest = {
            name: data.name
        };

        api.post<RegistryGunCategoryResponse>('categories', request).then(response => {
            console.log(response);
        });
        setIsOpen(false);
    });

    return (
        <DialogRoot lazyMount placement='center' open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <DialogTrigger asChild>
                <IconButton variant='subtle' data-testid="open">
                    <IoMdAdd />
                </IconButton>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>カテゴリー登録</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <form id="registryGunCategoryForm" noValidate onSubmit={onSubmit}>
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
                    <Button form="registryGunCategoryForm" type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}