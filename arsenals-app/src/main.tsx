import { createRoot } from 'react-dom/client'
import { App } from './app'
import { Provider } from './components/ui/provider'
import { enableMocking } from './testing/mocks'
import { StrictMode } from 'react'


enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>,
  )
});
