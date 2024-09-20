import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { DisplayDataType, MovieCardType } from '../../../utils/types';

export const MovieList = ({data: movies, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage }: DisplayDataType<Array<MovieCardType | undefined>> &
   {
    hasNextPage: boolean,
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
                <Card key={movie.id} mode={movie.mode} id={movie.id} title={movie.title} poster={movie.poster} isFetching={isFetching || false} />
              )
            }
          })
        }
      </div>
      <div className="flex items-center justify-center mt-8">
            {
              (hasNextPage) ? 
                <Button text="Watch more" ghost onClick={() => fetchNextPage()} disabled={isFetchingNextPage}/> 
              :
                <></>
            }
      </div>
    </>
  );
}