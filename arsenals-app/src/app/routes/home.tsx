import { Link } from 'react-router-dom'
import './home.css'
import { useOktaAuth } from '@okta/okta-react';

function Home() {

  const { authState, oktaAuth } = useOktaAuth();
  console.log(authState?.isAuthenticated);
  const handleLogin = () => oktaAuth.signInWithRedirect();

  return (
    <>
      <h1>Hello</h1>
      <p>{authState?.isAuthenticated}</p>
      <nav>
        <Link id='protected-nav-link' to='/protected'>Protected</Link>
      </nav>
      <button onClick={handleLogin}>signin</button>
    </>
  )
}

export default Home
