import { IonContent, IonFooter, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"

export type ContentLayoutProps = {
    children: React.ReactNode | undefined,
    title: string
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children, title }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* メインコンテント */}
            <IonContent fullscreen>
                {children}
            </IonContent>


            <IonFooter>
                <IonText>@ footer info</IonText>
            </IonFooter>

        </IonPage>
    )
}