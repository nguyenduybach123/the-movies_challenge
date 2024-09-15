import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import noResultSearchImg from '../../../assets/not-result-search.png'
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { QueryParamType } from '../../../utils/types';
import { getMovies, getMoviesByName, getMoviesByType } from '../../../service/movie';

export const MovieList = () => {
  //const lastPosRef = React.useRef(null);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(_setSearchParams);

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
    },
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

  const movies = movieData?.pages.flatMap((page) => page);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    navigate('/')
  }
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
        {
          movies &&
          movies.map((movie) => {
            if(movie) {
              return (
                <Card key={movie.poster} mode={movie.mode} id={movie.id} title={movie.title} poster={movie.poster} />
              )
            }
          })
        }
      </div>
      {
        (movies.length !== 0) ?
          (<div className="flex items-center justify-center mt-8">
            {
              hasNextPage ? 
                <Button text="Watch more" ghost onClick={() => {fetchNextPage();}} disabled={isFetchingNextPage}/> 
              :
                <p className="w-full min-h-60 text-center text-white font-semibold">Last page</p>
            }
          </div>) 
        : 
            (<div className="h-full text-center font-semibold text-white">
              <h1 className="text-3xl p-4 mb-4">No Results Found For : {keywordParam}</h1>
              <img src={noResultSearchImg} className="w-50/2 h-36 mx-auto" />
              <p className="">Don't give up</p>
            </div>)
      }
    </>
  )
}
