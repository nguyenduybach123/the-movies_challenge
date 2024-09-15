import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules';

import { getBannerMovies } from '../../../../service/banner';
import { Banner } from '../Banner';

export const BannerSlider = () => {
  const {data: banners , isPending, isError, error} = useQuery({
    queryKey: ['banner'],
    queryFn: getBannerMovies,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

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
