import React from 'react'
import { Banner } from '../Banner'
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames'

import 'swiper/css';

const banners = [
  {
    id:1
  },
  {
    id:2
  },
  {
    id:3
  }
]

export const BannerSlider = () => {
  const [current, setCurrent] = React.useState(0);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={() => console.log('')}
    >
      <SwiperSlide><Banner /></SwiperSlide>
      <SwiperSlide><Banner /></SwiperSlide>
      <SwiperSlide><Banner /></SwiperSlide>
      <SwiperSlide><Banner /></SwiperSlide>
      ...
    </Swiper>
  );
}
