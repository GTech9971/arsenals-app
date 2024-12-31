import { Meta, StoryObj } from "@storybook/react";
import { ContentLayout } from "./content-layout";

const meta = {
    title: 'Arsenals/Layouts/ContentLayout',
    component: ContentLayout,
    parameters: { layout: 'centered' },
    tags: ['autodocs']
} satisfies Meta<typeof ContentLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'sample',
        children: undefined
    }
}