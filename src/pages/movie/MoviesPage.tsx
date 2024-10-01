import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { SearchBar } from '../../components/SearchBar'
import { NotFoundResult } from './components/NotFoundResult'
import { MovieList } from './components/MovieList'
import { QueryParamType } from '../../utils/types'
import { getMovies, getMoviesByName, getMoviesByType } from '../../service/movie'

export const MoviesPage = () => {
  const [searchParams,] = useSearchParams();

  let queryParams: QueryParamType = {
    key: ["movies"],
    fn: getMovies,
    enable: true
  }

  const keywordParam = searchParams.get('keyword');
  const typeParam = searchParams.get('type');
  if(keywordParam !== "" && keywordParam !== null) {
    queryParams = {
      key: ["search", keywordParam],
      fn: (page) => getMoviesByName(page, keywordParam),
      enable: true
    }
  }
  else if (typeParam !== "" && typeParam !== null) {
    queryParams = {
      key: ["type", typeParam],
      fn: (page) => getMoviesByType(page, typeParam),
      enable: true
    }
  }

  // HTTP GET MOVIES
  const { data: movieData,
          isError,
          error,
          isFetching,
          fetchNextPage,
          isFetchingNextPage,
          hasNextPage
  } = useInfiniteQuery({
    queryKey:[...queryParams.key],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await queryParams.fn(pageParam);
      
      return response;
    },
    getNextPageParam: (lastpage, pages) => {
      if(lastpage && lastpage.length < 20) {
        return undefined;
      }
      return pages.length + 1;
    },
    initialPageParam: 1,
    initialData: {
      pages: [],
      pageParams: [1]
    },
  })

  const movies = movieData?.pages.flatMap((page) => page);

  React.useEffect(() => {
    window.scrollTo(0,0);
  },[])

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="relative h-48 bg-[url(&quot;src/assets/footer-bg.jpg&quot;)] bg-cover bg-center bg-no-repeat after:content-[&quot;&quot;] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-transparent">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Movies</span>
      </div>
      <div className="bg-black-main px-8 py-4 md:px-16 md:py-8">
        <SearchBar />
        {
          (movies.length === 0) ?
            (<NotFoundResult keyword={keywordParam ? keywordParam : ""} isFetching={isFetching} />) 
          :
            (<MovieList data={movies ? movies : []} fetchNextPage={fetchNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />)  
        }
      </div>
    </>
  );
}