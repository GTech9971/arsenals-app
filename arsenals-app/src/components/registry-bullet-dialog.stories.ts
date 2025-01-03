import { Meta, StoryObj } from "@storybook/react";
import { RegistryBulletDialog } from "./registry-bullet-dialog";

const meta = {
    title: 'Arsenals/RegistryBulletDialog',
    component: RegistryBulletDialog,
    tags: ['autodocs'],
} satisfies Meta<typeof RegistryBulletDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        dismiss: (data?: string | undefined | null, role?: string) => {
            console.log(data);
            console.log(role);
        }
    }
};