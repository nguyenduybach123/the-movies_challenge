import React from 'react'
import { MovieCardType, MovieResponseType } from '../utils/constants'
import { httpRequest } from '../utils/httpRequest'
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';

const MAXIMUM_MOVIE = 24;

export const MovieList = () => {
  const getMovies = async () => {
      const response = await httpRequest.get("movie/popular?api_key=ae722869d6f14e76aebfb0d1fd961dd7");
      const movies:Array<MovieResponseType> = response.data?.results ;

      if(!movies)
        return;

      const popularMovies:Array<MovieCardType> = movies.slice(0, MAXIMUM_MOVIE).map(
        (movie) => ({
          title: movie.title,
          poster: movie.poster_path,
        })
      )

      return popularMovies;
  }
  
  // HTTP GET MOVIES
  const { isPending, isError, data: movies, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  })

  
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="grid grid-cols-6 gap-4 -mx-2 mt-16">
    { 
      movies &&
      movies.map((movie) => (
        <MovieCard key={movie.poster} title={movie.title} poster={movie.poster} />
      ))
    }
    </div>
  )
}
