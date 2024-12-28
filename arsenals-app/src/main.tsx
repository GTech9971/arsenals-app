// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { Provider } from './components/ui/provider'
import { enableMocking } from './testing/mocks'


enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider>
      <App />
    </Provider>
    // </StrictMode>,
  )
});
