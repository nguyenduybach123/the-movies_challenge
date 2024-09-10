import { MovieCardType, MovieResponseType, QueryParamType } from '../utils/constants'
import { httpRequest } from '../utils/httpRequest'
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import { Button } from './Button';
import { useSearchParams } from 'react-router-dom';

export const MovieList = () => {
  //const lastPosRef = React.useRef(null);
  const [searchParams, _setSearchParams] = useSearchParams();
  console.log(_setSearchParams);

  const getMovies = async (page: number) => {
      const response = await httpRequest.get(`movie/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const movies:Array<MovieResponseType> = response.data?.results ;

      if(!movies)
        return;
      
      const cardMovies:Array<MovieCardType> = movies.map(
        (movie) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            mode: "movie"
        })
    )

      return cardMovies;
  }

  const getMoviesByName = async (page: number) => {
    const response = await httpRequest.get(`search/movie?query=${searchParams.get('keyword')}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const movies:Array<MovieResponseType> = response.data?.results ;

      if(!movies)
        return;
      
      const cardMovies:Array<MovieCardType> = movies.map(
        (movie) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            mode: "movie"
        }));

      return cardMovies;
  }

  const getMoviesByType = async (page: number) => {
    const response = await httpRequest.get(`movie/${searchParams.get('type')}?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const moviesByTypeData:Array<MovieResponseType> = response.data?.results;

    if(!response)
      return;

    const moviesByType:Array<MovieCardType> = moviesByTypeData.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      mode: "movie"
    }))

    return moviesByType;
  }

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
      fn: getMoviesByName,
      enable: true
    }
  }
  else if (typeParam !== "" && typeParam !== null) {
    queryParams = {
      key: ["type", typeParam],
      fn: getMoviesByType,
      enable: true
    }
  }

  // HTTP GET MOVIES
  const { data: movieData,
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
  console.log(movieData)
  console.log(movies)

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
          movies &&
          movies.map((movie) => {
            if(movie) {
              return (
                <MovieCard key={movie.poster} mode={movie.mode} id={movie.id} title={movie.title} poster={movie.poster} />
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
