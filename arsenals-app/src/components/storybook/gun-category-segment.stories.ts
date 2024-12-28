import { Meta, StoryObj } from "@storybook/react";
import { GunCategorySegment } from "../gun-category-segment";

const meta = {
    title: 'Arsenals/GunCategorySegment',
    component: GunCategorySegment,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],

} satisfies Meta<typeof GunCategorySegment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}