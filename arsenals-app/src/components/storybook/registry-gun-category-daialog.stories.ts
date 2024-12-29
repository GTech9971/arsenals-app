import { Meta, StoryObj } from "@storybook/react";
import { RegistryGunCategoryDialog } from "../registry-gun-category-daialog";

const meta = {
    title: 'Arsenals/RegistryGunCategoryDialog',
    component: RegistryGunCategoryDialog,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RegistryGunCategoryDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};