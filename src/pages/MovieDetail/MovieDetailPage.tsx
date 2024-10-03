// Core
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum } from '../../utils/types';
import { getMovieCast, getMovieDetail, getMovieIntroduces } from '../../service/movie';
import { CardSlider } from '../../components/Card/CardSlider';

// Internal
import { MovieInfo, MovieIntroduce } from './components';
import { useEffect } from 'react';

// Component
export const MovieDetailPage = () => {
  // State
  const { id } = useParams();

  // Queries
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

  // Effect
  // * srcoll to top
  useEffect(() => {
    window.scrollTo(0,0);
  },[movieDetail])

  // Templates
  if (isErrorDetail) {
    return <span>Error: {errorDetail.message}</span>
  }

  if (isErrorIntroduce) {
      return <span>Error: {errorIntroduce.message}</span>
  }

  return (
    <>
      <MovieInfo data={movieDetail} casts={casts ? casts : []} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce data={movieIntroduces ? movieIntroduces : []} isFetching={isMovieIntroducePending} />
        <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="movie" />
      </div>
    </>
  );
}