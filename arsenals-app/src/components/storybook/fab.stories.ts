import { Meta, StoryObj } from "@storybook/react";
import { Fab } from "../ui/fab";

const meta = {
    title: 'Arsenals/Fab',
    component: Fab,
    parameters: { layout: 'centered' },
    tags: ['autodocs']
} satisfies Meta<typeof Fab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onClick: () => { console.debug('') }
    }
}