import { Meta, StoryObj } from "@storybook/react";
import { RegistryGun } from "./registry-gun";

const meta = {
    title: 'Arsenals/Pages/RegistryGun',
    component: RegistryGun,
    tags: ["autodocs"]
} satisfies Meta<typeof RegistryGun>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}