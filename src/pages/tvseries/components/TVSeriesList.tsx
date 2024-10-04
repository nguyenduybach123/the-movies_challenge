import { InfiniteData, InfiniteQueryObserverResult} from '@tanstack/react-query';

import { Button } from '../../../components/Button';
import { DisplayDataType, CardType, TVSeriesResponseType } from '../../../utils/types';
import Card from '../../../components/Card/Card';
import { useMemo } from 'react';

export const TVSeriesList = ({ data: tvSeries, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage }: DisplayDataType<InfiniteData<TVSeriesResponseType[]>> & {
  hasNextPage: boolean,
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<TVSeriesResponseType[], unknown>, Error>>,
  isFetchingNextPage: boolean
 }) => {


    const tvSeriesCards:Array<CardType> = useMemo(() => {
        return tvSeries?.pages.flatMap((page) => page).map(
            (tv) => ({
                id: tv.id,
                title: tv.name,
                poster: tv.poster_path,
                mode: "tv"
            })
        )
    }, [tvSeries]);

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
            {
                tvSeriesCards.map((tv) => {
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
                    <Button text="Watch more" ghost onClick={() => fetchNextPage()} loading={isFetchingNextPage}/> 
                :
                    <></>
            }
        </div>
    </>
  )
}

export default TVSeriesList;