import React from 'react'
import { MovieInfo } from '../../components/Detail/MovieInfo'
import { MovieIntroduce } from '../../components/Detail/MovieIntroduce'
import { MovieCardSlider } from '../../components/Slider/MovieCardSlider'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MovieDisplayEnum } from '../../utils/constants'

export const MovieDetailPage = () => {
  return (
    <div>
      <Header />
      <MovieInfo />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce />
        <MovieCardSlider title="Similar" displayType={MovieDisplayEnum.Similar} mode="movie" />
      </div>
      <Footer />
    </div>
  )
}
