// Core
import { FC, ReactNode } from 'react'

// Internal
import { Header, Footer } from './components';

// Component
export const DefaultLayout: FC<{children: ReactNode}> = ({ children }) => {
  
  // Template
  return (
    <div className="relative">
        <Header />
        { children }
        <Footer />
    </div>
  );
}

export default DefaultLayout;