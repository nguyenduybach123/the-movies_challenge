import React from 'react'
import { Banner } from '../Banner'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import { httpRequest } from '../../utils/httpRequest';
import { BannerType, MovieResponseType } from '../../utils/constants';


const MAXIMUM_BANNER = 5;

export const BannerSlider = () => {
  const [banners, setBanners] = React.useState<BannerType[]>([])

  React.useEffect(() => {
    // HTTP GET BANNER
    const getBannerMovies = async () => {
      const response = await httpRequest.get('movie/popular?api_key=ae722869d6f14e76aebfb0d1fd961dd7');
      const movies:Array<MovieResponseType> = response.data?.results ;

      if(!movies)
        return;

      const bannerPopularMovies = movies.slice(0, MAXIMUM_BANNER).map(
        (movie) => ({
          name: movie.title,
          overview: movie.overview,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path
        })
      )

      setBanners(bannerPopularMovies);
    }

    getBannerMovies();
  },[])

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
    >
    {
      banners.map((banner) => (
        <SwiperSlide key={banner.name}>
          <Banner name={banner.name} overview={banner.overview} poster={banner.poster} backdrop={banner.backdrop} />
        </SwiperSlide>
      ))
    }
    </Swiper>
  );
}
