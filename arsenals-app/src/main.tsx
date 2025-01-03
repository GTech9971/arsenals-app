import { createRoot } from 'react-dom/client'
import { App } from './app'
import { enableMocking } from './testing/mocks'
import { StrictMode } from 'react'


enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
});
