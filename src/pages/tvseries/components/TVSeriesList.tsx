import { useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTVSeries, getTvSeriesByName, getTVSeriesByType } from '../../../service/tvSeries';
import { QueryParamType } from '../../../utils/types';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

export const TVSeriesList = () => {
    const [searchParams, _setSearchParams] = useSearchParams();
    console.log(_setSearchParams);

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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
            {
            tvSeriess &&
            tvSeriess.map((tvSeries) => {
                if(tvSeries) {
                return (
                    <Card key={tvSeries.poster} mode={tvSeries.mode} id={tvSeries.id} title={tvSeries.title} poster={tvSeries.poster} />
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
