import React from 'react'
import { MovieCardType, MovieResponseType } from '../utils/constants'
import { httpRequest } from '../utils/httpRequest'
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import { Button } from './Button';

export const MovieList = () => {
  //const lastPosRef = React.useRef(null);

  const getMovies = async (page: number) => {
      const response = await httpRequest.get(`movie/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
      const movies:Array<MovieResponseType> = response.data?.results ;
      console.log("Fetch data" + page)
      if(!movies)
        return;
      
      const cardMovies:Array<MovieCardType> = movies.map(
        (movie) => ({
            title: movie.title,
            poster: movie.poster_path,
        })
    )

      return cardMovies;
  }

  // HTTP GET MOVIES
  const { data,
          error,
          isError,
          isPending,
          fetchNextPage,
          isFetchingNextPage,
          hasNextPage,
  } = useInfiniteQuery({
    queryKey:['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getMovies(pageParam)
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


  const movies = data?.pages.flatMap(page => page)
  
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
          movies &&
          movies.map((movie) => {
            if(movie) {
              return (
                <MovieCard key={movie.poster} title={movie.title} poster={movie.poster} />
              )
            }
          })
        }
      </div>
      <div className="flex items-center justify-center mt-8">
        {
          hasNextPage ? 
            <Button text="Watch more" ghost onClick={() => {console.log("Click"); fetchNextPage();}} disabled={isFetchingNextPage}/> 
          :
            <p>Last page</p>
        }
      </div>
    </>
  )
}
