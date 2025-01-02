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

export const Handgun: Story = {
    args: {
        id: "G-1000",
        name: 'M1911A1',
        category: { name: 'ハンドガン' },
        capacity: 6,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOzyXOpgL7MotXGpyGwMFDPmaklfRU-E_4w&s',
    }
}