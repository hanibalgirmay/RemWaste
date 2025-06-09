import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Loader from './common/loader/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader />
    <App />
  </StrictMode>,
)
