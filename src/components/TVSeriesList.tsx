import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { MovieCardType, TVSerieResponseType } from '../utils/constants';
import { httpRequest } from '../utils/httpRequest';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import { Button } from './Button';

export const TVSeriesList = () => {
    const [searchParams, _setSearchParams] = useSearchParams();

  const getTVSeries = async (page: number) => {
      const response = await httpRequest.get(`tv/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const tvSeries:Array<TVSerieResponseType> = response.data?.results ;

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
    const tvSeries:Array<TVSerieResponseType> = response.data?.results ;

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
  
  // HTTP GET MOVIES
  const { data: tvSeriesData,
          error,
          isError,
          isPending,
          fetchNextPage,
          isFetchingNextPage,
          hasNextPage,
  } = useInfiniteQuery({
    queryKey:['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTVSeries(pageParam);
      return response;
    },
    getNextPageParam: (_,pages) => pages.length + 1,
    initialPageParam: 1,
    initialData: {
      pages: [],
      pageParams: [1]
    }
  })

  // HTTP GET SEARCH MOVIE
  const {
    data: searchMovieData,
    isPending: isSearchPending,
    isError: isSearchError,
    error: searchError,
    fetchNextPage: fetchNextSearchPage 
  } = useInfiniteQuery({
    queryKey: ['search', searchParams.get('keyword')],
    queryFn: async ({ pageParam }) => {
      const response = await getTvSeriesByName(pageParam);
      return response;
    },
    getNextPageParam: (_,pages) => pages.length +1,
    initialPageParam: 1,
    initialData: {
      pages: [],
      pageParams: [1],
    },
    enabled: searchParams.get('keyword') !== "" && searchParams.get('keyword') !== null
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

  if(searchParams.get('keyword')){
    const tvSeriess = searchMovieData?.pages.flatMap((page) => page);

    if (isSearchPending) {
      return <span>Loading...</span>
    }
  
    if (isSearchError) {
      return <span>Error: {searchError.message}</span>
    }

    return(
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
              <Button text="Watch more" ghost onClick={() => {fetchNextSearchPage();}} disabled={isFetchingNextPage}/> 
            :
              <p>Last page</p>
          }
        </div>
      </>
    )
  }

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
