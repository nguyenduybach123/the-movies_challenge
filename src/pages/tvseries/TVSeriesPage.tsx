// Core
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

//App
import { DisplayEnum, QueryTVSeriesParamType } from "../../utils/types";
import { getTVSeries } from "../../service/tvSeries";
import { BaseSpinner, NotFoundResult, SearchBar } from "../../components";

// Internal
import { TVSeriesList } from "./components";
import { NotFoundQuery } from "../../components/Exception";

// Component
export const TVSeriesPage = () => {
  // Hook
  const [searchParams,] = useSearchParams();

  // Queries
  let queryParams: QueryTVSeriesParamType = {
    key: ["tvseries"],
    fn: getTVSeries
  }

  const keywordParam = searchParams.get('keyword');
  const typeParam = searchParams.get('type');
  if(keywordParam !== "" && keywordParam !== null) {
    queryParams = {
      key: ["tvsearch", keywordParam],
      fn: (page: number) => getTVSeries(page, undefined, keywordParam)
    }
  }
  else if (typeParam !== "" && typeParam !== null) {
    queryParams = {
      key: ["tvtype", typeParam],
      fn: (page: number) => getTVSeries(page, typeParam as DisplayEnum)
    }
  }
  
  // HTTP GET TVSERIES
  const { data: tvSeries,
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
      pages: [[]],
      pageParams: [1]
    }
  })

  // Effect
  // * sync scroll to top
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  // Templates
  if (isError) {
    return <NotFoundQuery />
  }

  return (
    <>
      <div className="relative h-48 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-white">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Tv Series</span>
      </div>
      <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
        <SearchBar />
        {
              (tvSeries.pages[0].length === 0) ?
                (isFetching) ?
                  (
                    <div className='flex justify-center items-center w-screen h-screen'>
                      <BaseSpinner width={50} height={50} />
                    </div>
                  )
                :
                  (<NotFoundResult keyword={keywordParam ? keywordParam : ""} />)
              :
                (<TVSeriesList data={tvSeries} isFetching={isFetching} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />)   
        }
      </div>
    </>
  )
}