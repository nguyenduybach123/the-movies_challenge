import { InfiniteData, InfiniteQueryObserverResult} from '@tanstack/react-query';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { DisplayDataType, MovieCardType } from '../../../utils/types';

export const TVSeriesList = ({ data: tvSeries, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage }: DisplayDataType<Array<MovieCardType | undefined>> & {
  hasNextPage: boolean,
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<MovieCardType[] | undefined, unknown>, Error>>,
  isFetchingNextPage: boolean
 }) => {

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
            {
            tvSeries &&
            tvSeries.map((tv) => {
                if(tv) {
                    return (
                        <Card key={tv.id} mode={tv.mode} id={tv.id} title={tv.title} poster={tv.poster} isFetching={isFetching || false} />
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
  )
}