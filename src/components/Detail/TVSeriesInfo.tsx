import React from 'react'
import { useParams } from 'react-router-dom';
import { httpRequest } from '../../utils/httpRequest';
import { CastResponseType, CastType, TVSeriesDetailType } from '../../utils/constants';
import { useQuery } from '@tanstack/react-query';

const MAXIMUM_SHOW_CAST = 5;

export const TVSeriesInfo = () => {
    const { id } = useParams();
  
    const getMovieDetail = async () => {
      const response = await httpRequest.get(`tv/${id}?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const detail = response.data;
  
      if(!response)
        return;
  
      const movieDetail:TVSeriesDetailType = {
        id: detail.id,
        title: detail.name,
        overview: detail.overview,
        genres: detail.genres,
        poster: detail.poster_path,
        backdrop: detail.backdrop_path,
        vote_average: detail.vote_average,
        vote_count: detail.vote_count
      }
  
      return movieDetail;
    }
  
    const getMovieCast = async () => {
      const response = await httpRequest.get(`tv/${id}/credits?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const castData:Array<CastResponseType> = response.data?.cast;
  
      if(!response)
        return;
  
      const casts:Array<CastType> = castData.slice(0, MAXIMUM_SHOW_CAST).map(cast => ({
        id: cast.id,
        name: cast.name,
        profile: cast.profile_path
      }))
  
      return casts;
    }
  
    const { data: movieDetail } = useQuery({
      queryKey: ['tvseriesdetail'],
      queryFn: getMovieDetail
    })
  
    const movieId = movieDetail?.id;
  
    const {data: casts } = useQuery({
      queryKey: ['tvseriescasts'],
      queryFn: getMovieCast,
      enabled: !!movieId
    })
  
    return (
      <div className="relative px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:content-[&quot;&quot;] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 after:content-[&quot;&quot;] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail?.backdrop})`}}>
        <div className="flex items-start -mx-4 max-h-fit">
          <div className="hidden md:block w-64 lg:w-96 px-4">
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster}`} className="w-full rounded-3xl" />
          </div>
          <div className="px-4 flex-1 flex flex-col justify-between -my-2 lg:-my-4">
            <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">{movieDetail?.title}</h2>
            <ul className="flex items-center p-4">
              {
                movieDetail?.genres.map(genre => (
                  <li key={genre.id} className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">{genre.name}</li>
                ))
              }
            </ul>
            <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base">
              {
                movieDetail?.overview
              }
            </p>
            <h3 className="text-white text-xl font-medium py-2">Casts</h3>
            <div className="flex flex-wrap -mx-2 mt-1">
              {
                casts?.map(cast => (
                  <div key={cast.id} className="w-28 px-2 mb-1">
                    <img src={`https://image.tmdb.org/t/p/w500/${cast.profile}`} className="rounded-xl" />
                    <span className="text-white text-xs md:text-sm font-sm">{cast.name}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
}
