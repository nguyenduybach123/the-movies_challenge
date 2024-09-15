import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

import { DisplayEnum } from '../../../../utils/types';
import { getMovieIntroduces } from '../../../../service/movie';
import { CardSlider } from '../../../../components/Slider/CardSlider';

export const MovieIntroduce = () => {
  const { id } = useParams();

  const { data: movieIntroduces, isPending, isError, error } = useQuery({
    queryKey: ['videointroduce'],
    queryFn: () => getMovieIntroduces(id)
  })

  console.log(movieIntroduces);

  if (isPending) {
    return <span>Loading...</span>
}

  if (isError) {
      return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="py-2 px-4 md:px-8 lg:px-16">
        {
          movieIntroduces?.map(movieIntroduce => (
            <div className="mb-12" key={movieIntroduce.key}>
              <h3 className="text-white text-base md:text-2xl font-semibold mb-4">{movieIntroduce.name}</h3>
              <iframe src={`https://www.youtube.com/embed/${movieIntroduce.key}`} title="video" width="100%" height="800px" loading="lazy" allowFullScreen></iframe>
            </div>
          ))
        }
      </div>
      <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="movie" />
    </>
  )
}
