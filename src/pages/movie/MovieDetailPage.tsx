import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { MovieInfo } from './components/Detail/MovieInfo';
import { MovieIntroduce } from './components/Detail/MovieIntroduce';
import { CardSlider } from '../../components/Slider/CardSlider';
import { DisplayEnum } from '../../utils/types';
import { getMovieCast, getMovieDetail, getMovieIntroduces } from '../../service/movie';

export const MovieDetailPage = () => {
  const { id } = useParams();

  const { data: movieDetail, isError: isErrorDetail, error: errorDetail } = useQuery({
    queryKey: ['detail',id],
    queryFn: () => getMovieDetail(id)
  })

  const movieId = movieDetail?.id;

  const {data: casts } = useQuery({
    queryKey: ['casts', movieId],
    queryFn: () => getMovieCast(movieId),
    enabled: !!movieId
  })

  const { data: movieIntroduces, isPending: isMovieIntroducePending, isError: isErrorIntroduce, error: errorIntroduce } = useQuery({
    queryKey: ['videointroduce', movieId],
    queryFn: () => getMovieIntroduces(id)
  })

  React.useEffect(() => {
    window.scrollTo(0,0);
  },[movieDetail])

  if (isErrorDetail) {
    return <span>Error: {errorDetail.message}</span>
  }

  if (isErrorIntroduce) {
      return <span>Error: {errorIntroduce.message}</span>
  }

  return (
    <DefaultLayout>
      <MovieInfo data={movieDetail} casts={casts ? casts : []} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce data={movieIntroduces ? movieIntroduces : []} isFetching={isMovieIntroducePending} />
        <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="movie" />
      </div>
    </DefaultLayout>
  );
}