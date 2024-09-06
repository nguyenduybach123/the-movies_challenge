import React from 'react'

import { Slider } from '../../components/Slider/Slider'
import { Header } from '../../components/Header/Header'

export const HomePage = () => {
  return (
    <div className='relative'>
      <Header />
      <Slider />
    </div>
  )
}
