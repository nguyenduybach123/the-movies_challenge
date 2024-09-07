import React from 'react'
import { Banner } from '../Banner'

export const BannerSlider = () => {
  return (
    <div className='carousel-wrapper relative max-w-5xl w-full'>
      <div className='carousel'>
        <Banner />
      </div>
    </div>
  )
}
