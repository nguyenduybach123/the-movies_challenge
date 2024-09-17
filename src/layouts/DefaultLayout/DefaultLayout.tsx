import React from 'react'

import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'

export const DefaultLayout = ({ children }: {children: React.ReactNode}) => {
  
  return (
    <div className="relative">
        <Header />
        { children }
        <Footer />
    </div>
  );
}