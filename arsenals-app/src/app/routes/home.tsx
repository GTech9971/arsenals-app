import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonList, IonRow, } from '@ionic/react';
import { ContentLayout } from '@/components/layouts/content-layout';
import { CSSProperties } from 'react';

export const Home = () => {

  console.log("home");
  // const { authState, oktaAuth } = useOktaAuth();
  // const handleLogin = () => oktaAuth.signInWithRedirect();

  const center: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <ContentLayout
      title='ログイン'>

      <IonGrid style={center}>
        <IonCard style={{ width: '80vw', height: '70vh' }}>
          <IonCardHeader style={{ height: '20vh' }}>
            <IonCardTitle style={{ textAlign: 'center' }}>Arsenals</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonList>
                </IonList>
              </IonRow>
              <IonRow style={center}>
                <IonButton size='large' shape='round' >ログイン</IonButton>
              </IonRow>
            </IonGrid>

          </IonCardContent>
        </IonCard>
      </IonGrid>


    </ContentLayout >
  )
}