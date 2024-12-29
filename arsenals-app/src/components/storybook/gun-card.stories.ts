import { Meta, StoryObj } from "@storybook/react";
import { GunCard } from "../gun-card";

const meta = {
    title: 'Arsenals/GunCard',
    component: GunCard,
    parameters: { layout: 'centered' },
    tags: [
        'autodocs'
    ]
} satisfies Meta<typeof GunCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        name: 'G3A1',
        imageUrl: 'https://img01.militaryblog.jp/usr/o/r/g/orga/UMAREXsG3A3sGBBRskJPver.HKsLicensedkガスブローバックsVFC_4.jpg',
        capacity: 31,
        category: { name: 'アサルトライフル' }
    }
};