import React from 'react'

import { Slider } from '../../components/Slider/Slider'
import { Header } from '../../components/Header/Header'
import { TrailerModel } from '../../components/Modal/TrailerModel'

export const HomePage = () => {
  return (
    <div className='relative'>
      <Header />
      <TrailerModel />
      <Slider />
    </div>
  )
}
