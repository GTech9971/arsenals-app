import { IonContent, IonIcon, IonList, IonPopover } from "@ionic/react"
import { ellipsisHorizontalOutline, } from "ionicons/icons"
import React, { forwardRef } from "react"

export type PopoverProps = {
    popoverId: string,
    children: React.ReactNode,
    color?: string
}

export const Popover = forwardRef<HTMLIonPopoverElement, PopoverProps>((props, ref) => {

    return (
        <>
            <div style={{ position: 'absolute', top: 0, right: 0, margin: '5px', cursor: 'pointer' }}>
                <IonIcon style={{ position: 'relative', zIndex: 999 }} id={props.popoverId} size="large" color={props.color ?? 'light'} icon={ellipsisHorizontalOutline} />
            </div>

            <IonPopover ref={ref} trigger={props.popoverId}>
                <IonContent>
                    <IonList>
                        {props.children}
                    </IonList>
                </IonContent>
            </IonPopover>
        </>
    )
});