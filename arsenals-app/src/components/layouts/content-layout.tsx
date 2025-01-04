import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useOktaAuth } from "@okta/okta-react"
import React, { useEffect, useState } from "react"

export type ContentLayoutProps = {
    children: React.ReactNode | undefined,
    title: string,
    leftToolbar?: React.ReactNode | undefined,
    rightToolbar?: React.ReactNode | undefined
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children, title, leftToolbar, rightToolbar }) => {
    const [userInfo, setUserInfo] = useState<string | undefined>(undefined);
    const { authState, oktaAuth } = useOktaAuth();

    const logout = () => oktaAuth.signOut();

    useEffect(() => {
        if (!authState?.isAuthenticated) { return; }
        (async () => {
            const user = await oktaAuth.getUser();
            setUserInfo(user.name);
        })();
    }, [authState, oktaAuth]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        {leftToolbar}
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        {rightToolbar}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            {/* メインコンテント */}
            <IonContent fullscreen>
                {children}
            </IonContent>


            <IonFooter>
                <IonText>Arsenals app - ユーザー名:{userInfo}</IonText>

                <IonButtons slot="end">
                    <IonButton onClick={logout}>ログアウト</IonButton>
                </IonButtons>
            </IonFooter>

        </IonPage>
    )
}