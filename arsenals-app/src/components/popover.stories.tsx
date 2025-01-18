import { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./popover";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

const meta = {
    title: 'Arsenals/Popover',
    parameters: {
        layout: 'centered'
    },
    component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        popoverId: 'test',
        color: 'primary',
        children: (
            <>
                <IonItem lines="none" button detail={false}>
                    <IonLabel color="danger">削除</IonLabel>
                    <IonIcon color="danger" icon={trashOutline} />
                </IonItem>
            </>
        )
    }
}