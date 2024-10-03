// Core
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

//App
import { QueryParamType } from '../../utils/types';
import { getTVSeries, getTvSeriesByName, getTVSeriesByType } from '../../service/tvSeries';
import { SearchBar } from '../../components';

// Internal
import { NotFoundResult, TVSeriesList } from './components';

// Component
export const TVSeriesPage = () => {
  // States
  const [searchParams,] = useSearchParams();

  // Queries
  let queryParams: QueryParamType = {
    key: ["tvseries"],
    fn: getTVSeries,
    enable: true
  }

  const keywordParam = searchParams.get('keyword');
  const typeParam = searchParams.get('type');
  if(keywordParam !== "" && keywordParam !== null) {
    queryParams = {
      key: ["tvsearch", keywordParam],
      fn: (page: number) => getTvSeriesByName(page,keywordParam),
      enable: true
    }
  }
  else if (typeParam !== "" && typeParam !== null) {
    queryParams = {
      key: ["tvtype", typeParam],
      fn: (page: number) => getTVSeriesByType(page, typeParam),
      enable: true
    }
  }
  
  // HTTP GET MOVIES
  const { data: tvSeriesData,
          error,
          isError,
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
    }
  })

  const tvSeries = tvSeriesData?.pages.flatMap((page) => page);

  // Effects
  // * scroll to top
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  // Templates
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="relative h-48 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-white">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Tv Series</span>
      </div>
      <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
        <SearchBar />
        {
          (tvSeries.length === 0) ?
            (<NotFoundResult keyword={keywordParam ? keywordParam : ""} isFetching={isFetching} />)
          :
            (<TVSeriesList data={tvSeries} isFetching={isFetching} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />)        
        }
      </div>
    </>
  )
}