// Core
import { FC } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules";

// App
import { BannerType } from "../../../../utils/types";

// Internal
import { Banner } from "./Banner";

// Component
export const BannerSlider :FC<{ data: Array<BannerType> }> = ({ data:banners }) => {

  // Template
  return (
      <Swiper
        spaceBetween={0}
        slidesPerView={'auto'}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
      >
      {
        banners &&
          banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Banner id={banner.id} name={banner.name} overview={banner.overview} poster={banner.poster} backdrop={banner.backdrop} />
            </SwiperSlide>
          ))
      }
      </Swiper>
  );
}

export default BannerSlider;