import React from 'react'
import { BannerSlider } from '../../components/Slider/BannerSlider'
import { Header } from '../../components/Header'
import { TrailerModel } from '../../components/Modal/TrailerModel'
import { MovieCardSlider } from '../../components/Slider/MovieCardSlider'
import { Footer } from '../../components/Footer'
import { MovieDisplayEnum } from '../../utils/constants'

export const HomePage = () => {
  return (
    <div className='relative'>
      <Header />
      <TrailerModel />
      <BannerSlider />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieCardSlider title="Trending Movies" displayType={MovieDisplayEnum.Trending} mode="movie" />
        <MovieCardSlider title="Top Rated Movies" displayType={MovieDisplayEnum.TopRated} mode="movie" />
        <MovieCardSlider title="Trending TV" displayType={MovieDisplayEnum.Trending} mode="tv" />
        <MovieCardSlider title="Top Rated TV" displayType={MovieDisplayEnum.TopRated} mode="tv" />
      </div>
      <Footer />
    </div>
  )
}
