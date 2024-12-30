import { Meta, StoryObj } from "@storybook/react";
import { ViewLayout } from "../layouts/view-layout";

const meta = {
    title: 'Arsenals/Layouts/View',
    component: ViewLayout,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ViewLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};