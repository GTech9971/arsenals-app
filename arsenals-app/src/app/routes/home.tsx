import { Link } from 'react-router-dom'
import './home.css'
import { useOktaAuth } from '@okta/okta-react';
import { IonContent, IonPage } from '@ionic/react';

function Home() {
  const { authState, oktaAuth } = useOktaAuth();
  const handleLogin = () => oktaAuth.signInWithRedirect();

  return (
    <IonPage>

      <IonContent fullscreen>
        <h1>Hello</h1>
        <p>{authState?.isAuthenticated}</p>
        <nav>
          <Link id='protected-nav-link' to='/protected'>Protected</Link>
        </nav>
        <button onClick={handleLogin}>signin</button>
      </IonContent>
    </IonPage>
  )
}

export default Home
