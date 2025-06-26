import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './context/storeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
