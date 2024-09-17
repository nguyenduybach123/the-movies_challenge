import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { DisplayDataType, MovieCardType } from '../../../utils/types';

const MAX_MOVIE = 20;

export const MovieList = ({data: movies, fetchNextPage, isFetchingNextPage }: DisplayDataType<Array<MovieCardType | undefined>> &
   {
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<MovieCardType[] | undefined, unknown>, Error>>,
    isFetchingNextPage: boolean
   }) => {
    
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
        {
          movies &&
          movies.map((movie) => {
            if(movie) {
              return (
                <Card key={movie.id} mode={movie.mode} id={movie.id} title={movie.title} poster={movie.poster} />
              )
            }
          })
        }
      </div>
      <div className="flex items-center justify-center mt-8">
            {
              (movies.length === MAX_MOVIE) ? 
                <Button text="Watch more" ghost onClick={() => fetchNextPage()} disabled={isFetchingNextPage}/> 
              :
                <></>
            }
      </div>
    </>
  );
}