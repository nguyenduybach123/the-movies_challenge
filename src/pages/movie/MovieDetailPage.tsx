import React from 'react'

import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { MovieInfo } from './components/Detail/MovieInfo';
import { MovieIntroduce } from './components/Detail/MovieIntroduce';

export const MovieDetailPage = () => {
  React.useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <DefaultLayout>
      <MovieInfo />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce />
      </div>
    </DefaultLayout>
  )
}
