import React from 'react'
import { Button } from './Button'
import { httpRequest } from '../utils/httpRequest';
import { MovieCardType, MovieResponseType } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const getMoviesByName = async () => {
    const response = await httpRequest.get(`search/movie?query=${searchValue}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const movies:Array<MovieResponseType> = response.data?.results ;

      if(!movies)
        return;
      
      const cardMovies:Array<MovieCardType> = movies.map(
        (movie) => ({
            title: movie.title,
            poster: movie.poster_path,
        }));

      return cardMovies;
  }

  const handleSearchMovie = () => {
    refetch();
    navigate(`http://localhost:5173/movie?keyword=${searchValue}`);
  }

  const { refetch, isError, error } = useQuery({
    queryKey: ['search'],
    queryFn: getMoviesByName,
    enabled: false
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className=" flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit">
        <input className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
               placeholder="Enter keyword"
               onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
        />
        <Button text='Search' type='primary' onClick={handleSearchMovie} />
    </div>
  )
}
