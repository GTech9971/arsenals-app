import { Meta, StoryObj } from "@storybook/react";
import { View } from "./view";

const meta = {
    title: 'Arsenals/Pages/View',
    component: View,
    tags: ['autodocs'],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};