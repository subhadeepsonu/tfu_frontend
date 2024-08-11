import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './components/navbar.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster richColors></Toaster>
    <Navbar></Navbar>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
