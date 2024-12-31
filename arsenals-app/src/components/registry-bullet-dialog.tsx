import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { Input } from "@chakra-ui/react";
import { RegistryBulletRequest, RegistryBulletResponse } from "@gtech9971/arsenals.model";
import { api } from "@/lib/api-client";

const formSchema = z.object({
    name: z.string().nonempty({ message: '弾丸名は必須です。' }),
    damage: z.preprocess((val) => parseInt(val as string), z.number().nonnegative().min(1, "ダメージは1以上です").max(5000, "ダメージは5000以下です。"))
});

type FormValues = z.infer<typeof formSchema>;

export const RegistryBulletDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        formState
    } = useForm<FormValues>({
        defaultValues: undefined,
        resolver: zodResolver(formSchema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const request: RegistryBulletRequest = {
            name: data.name,
            damage: data.damage
        };

        api.post<RegistryBulletResponse>("bullets", request).then(response => {
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
                    <DialogTitle>弾丸登録</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <form id="registryBulletForm" onSubmit={onSubmit}>
                        {/* 弾丸名 */}
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Field label="弾丸名" required>
                                    <Input placeholder="9mm" {...field} />
                                    {formState.errors.name && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>
                                            {formState.errors.name.message}
                                        </span>
                                    )}
                                </Field>
                            )}>
                        </Controller>

                        {/* ダメージ */}
                        <Controller
                            control={control}
                            name="damage"
                            render={({ field }) => (
                                <Field label="ダメージ" required>
                                    <Input placeholder="12" type="number" {...field} />
                                    {formState.errors.damage && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>
                                            {formState.errors.damage.message}
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
                    <Button form="registryBulletForm" type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}