import { Meta, StoryObj } from "@storybook/react";
import { RegistryGunForm } from "./registry-gun-form";

const meta = {
    title: 'Arsenals/Features/RegistryGunForm',
    component: RegistryGunForm,
    tags: ['autodocs']
} satisfies Meta<typeof RegistryGunForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        showSubmit: true
    }
}
