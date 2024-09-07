import React from 'react'
import { BannerSlider } from '../../components/Slider/BannerSlider'
import { Header } from '../../components/Header'
import { TrailerModel } from '../../components/Modal/TrailerModel'

export const HomePage = () => {
  return (
    <div className='relative'>
      <Header />
      <TrailerModel />
      <BannerSlider />
    </div>
  )
}
