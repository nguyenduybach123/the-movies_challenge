import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { MovieCardType, QueryParamType, TVSeriesResponseType,  } from '../utils/constants';
import { httpRequest } from '../utils/httpRequest';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import { Button } from './Button';

export const TVSeriesList = () => {
    const [searchParams, _setSearchParams] = useSearchParams();

  const getTVSeries = async (page: number) => {
      const response = await httpRequest.get(`tv/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const tvSeries:Array<TVSeriesResponseType> = response.data?.results ;

      if(!tvSeries)
        return;
      
      const cardTVSeries:Array<MovieCardType> = tvSeries.map(
        (tv) => ({
            id: tv.id,
            title: tv.name,
            poster: tv.poster_path,
            mode: "tv"
        })
    )

      return cardTVSeries;
  }

  const getTvSeriesByName = async (page: number) => {
    const response = await httpRequest.get(`search/tv?query=${searchParams.get('keyword')}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const tvSeries:Array<TVSeriesResponseType> = response.data?.results ;

      if(!tvSeries)
        return;
      
      const cardTVSeries:Array<MovieCardType> = tvSeries.map(
        (tv) => ({
            id: tv.id,
            title: tv.name,
            poster: tv.poster_path,
            mode: "tv"
        }));

      return cardTVSeries;
  }

  const getTVSeriesByType = async (page: number) => {
    const response = await httpRequest.get(`${searchParams.get('type')}/movie?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const moviesByTypeData:Array<TVSeriesResponseType> = response.data?.results;

    if(!response)
      return;

    const moviesByType:Array<MovieCardType> = moviesByTypeData.map(movie => ({
      id: movie.id,
      title: movie.name,
      poster: movie.poster_path,
      mode: "movie"
    }))

    return moviesByType;
  }

  let queryParams: QueryParamType = {
    key: ["tvseries"],
    fn: getTVSeries,
    enable: true
  }

  if(searchParams.get('keyword') !== "" && searchParams.get('keyword') !== null) {
    queryParams = {
      key: ["tvsearch", searchParams.get('keyword')],
      fn: getTvSeriesByName,
      enable: true
    }
  }
  else if (searchParams.get('type') !== "" && searchParams.get('type') !== null) {
    queryParams = {
      key: ["tvtype", searchParams.get('type')],
      fn: getTVSeriesByType,
      enable: true
    }
  }
  
  // HTTP GET MOVIES
  const { data: tvSeriesData,
          error,
          isError,
          isPending,
          fetchNextPage,
          isFetchingNextPage,
          hasNextPage,
  } = useInfiniteQuery({
    queryKey:[...queryParams.key],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await queryParams.fn(pageParam);
      return response;
    },
    getNextPageParam: (_,pages) => pages.length + 1,
    initialPageParam: 1,
    initialData: {
      pages: [],
      pageParams: [1]
    }
  })

  // const observer = new IntersectionObserver((entries, observer) => {
  //   entries.forEach( entry => {
  //     if(hasNextPage) {
  //       if(entry.isIntersecting) {
  //         console.log("Here")
  //         fetchNextPage();
  //         observer.unobserve(entry.target)
  //       }
  //     }
  //   })
  // })

  // React.useEffect(() => {
  //   const lastPosElement = lastPosRef.current;
  //   if (lastPosElement) {
  //     observer.observe(lastPosElement);
  //   }
  // },[lastPosRef])

  const tvSeriess = tvSeriesData?.pages.flatMap((page) => page);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
        <div className="grid grid-cols-6 gap-4 -mx-2 mt-16">
            {
            tvSeriess &&
            tvSeriess.map((tvSeries) => {
                if(tvSeries) {
                return (
                    <MovieCard key={tvSeries.poster} mode={tvSeries.mode} id={tvSeries.id} title={tvSeries.title} poster={tvSeries.poster} />
                )
                }
            })
            }
        </div>
        <div className="flex items-center justify-center mt-8">
            {
            hasNextPage ? 
                <Button text="Watch more" ghost onClick={() => {fetchNextPage();}} disabled={isFetchingNextPage}/> 
            :
                <p>Last page</p>
            }
        </div>
    </>
  )
    
}
