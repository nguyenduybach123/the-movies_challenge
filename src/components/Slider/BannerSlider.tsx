import { Banner } from '../Banner'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import { httpRequest } from '../../utils/httpRequest';
import { BannerType, MovieResponseType } from '../../utils/constants';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';


const MAXIMUM_BANNER = 5;

export const BannerSlider = () => {
  

  const getBannerMovies = async () => {
    const response = await httpRequest.get('movie/popular?api_key=ae722869d6f14e76aebfb0d1fd961dd7');
    const movies:Array<MovieResponseType> = response.data?.results ;

    if(!movies)
      return;

    const bannerPopularMovies:Array<BannerType> = movies.slice(0, MAXIMUM_BANNER).map(
      (movie) => ({
        id: movie.id,
        name: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path
      })
    )

    return bannerPopularMovies;
  }

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
