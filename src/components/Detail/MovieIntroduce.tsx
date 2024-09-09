import React from 'react'
import { httpRequest } from '../../utils/httpRequest'
import { useParams } from 'react-router-dom'
import { MovieDisplayEnum, VideoIntroduceResponseType, VideoIntroduceType } from '../../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { MovieCardSlider } from '../Slider/MovieCardSlider';

const MAXIMUM_SHOW_VIDEO = 5;

export const MovieIntroduce = () => {
  const { id } = useParams();

  const getMovieIntroduces = async () => {
    const response = await httpRequest.get(`movie/${id}/videos?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const videoIntroducesData:Array<VideoIntroduceResponseType> = response.data?.results;
    
    if(!response)
      return;

    const videoIntroduces:Array<VideoIntroduceType> = videoIntroducesData.slice(0, MAXIMUM_SHOW_VIDEO).map(videoIntroduce => ({
      name: videoIntroduce.name,
      key: videoIntroduce.key,
      site: videoIntroduce.site,
      size: videoIntroduce.size,
      type: videoIntroduce.type,
      official: videoIntroduce.official,
      publishedAt: videoIntroduce.published_at
    }))

    return videoIntroduces;
  }

  const { data: movieIntroduces, isPending, isError, error } = useQuery({
    queryKey: ['videointroduce'],
    queryFn: getMovieIntroduces
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
      <MovieCardSlider title="Similar" displayType={MovieDisplayEnum.Similar} similarId={id} mode="movie" />
    </>
  )
}
