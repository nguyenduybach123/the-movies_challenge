import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HomeProvider } from './pages/Home/context/HomeContext.tsx'
import { HeaderProvider } from './layouts/components/Header/context/HeaderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeProvider>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </HomeProvider>
  </StrictMode>,
)
