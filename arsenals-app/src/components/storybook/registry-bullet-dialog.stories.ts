import { Meta, StoryObj } from "@storybook/react";
import { RegistryBulletDialog } from "../registry-bullet-dialog";

const meta = {
    title: 'Arsenals/RegistryBulletDialog',
    component: RegistryBulletDialog,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RegistryBulletDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};