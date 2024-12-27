import { Link } from 'react-router-dom'
import './home.css'

function Home() {

  return (
    <>
      <h1>Hello</h1>
      <nav>
        <Link id='protected-nav-link' to='/protected'>Protected</Link>
      </nav>
    </>
  )
}

export default Home
