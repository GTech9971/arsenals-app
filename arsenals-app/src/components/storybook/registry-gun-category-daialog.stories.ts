import { Meta, StoryObj } from "@storybook/react";
import { RegistryGunCategoryDialog } from "../registry-gun-category-dialog";

const meta = {
    title: 'Arsenals/RegistryGunCategoryDialog',
    component: RegistryGunCategoryDialog,
    tags: ['autodocs'],
} satisfies Meta<typeof RegistryGunCategoryDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        dismiss: (data?: string | undefined | null, role?: string | null | undefined) => {
            console.log(data);
            console.log(role);
        }
    }
};