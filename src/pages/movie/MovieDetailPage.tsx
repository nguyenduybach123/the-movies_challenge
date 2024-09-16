import React from 'react'

import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { MovieInfo } from './components/Detail/MovieInfo';
import { MovieIntroduce } from './components/Detail/MovieIntroduce';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieCast, getMovieDetail, getMovieIntroduces } from '../../service/movie';
import { CardSlider } from '../../components/Slider/CardSlider';
import { DisplayEnum } from '../../utils/types';

export const MovieDetailPage = () => {
  const { id } = useParams();
  //const navigate = useNavigate();

  const { data: movieDetail, isPending: isDetailPending } = useQuery({
    queryKey: ['detail',id],
    queryFn: () => getMovieDetail(id)
  })

  const movieId = movieDetail?.id;

  const {data: casts } = useQuery({
    queryKey: ['casts',movieId],
    queryFn: () => getMovieCast(movieId),
    enabled: !!movieId
  })

  const { data: movieIntroduces, isPending: isPendingIntroduce} = useQuery({
    queryKey: ['videointroduce',id],
    queryFn: () => getMovieIntroduces(id)
  })

  React.useEffect(() => {
    window.scrollTo(0,0);
  },[movieDetail])

  return (
    <DefaultLayout>
      <MovieInfo data={movieDetail} casts={casts ? casts : []} isFetching={isDetailPending} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce data={movieIntroduces ? movieIntroduces : []} isFetching={isPendingIntroduce}  />
        <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="movie" />
      </div>
    </DefaultLayout>
  )
}
