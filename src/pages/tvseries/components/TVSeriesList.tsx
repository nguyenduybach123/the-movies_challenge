// Core
import { FC, useMemo } from 'react';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

// App
import { CardProps, TVSeriesResponseType } from '../../../utils/types';

import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button';

// Type
type TVSeriesType = {
    tvseries: InfiniteData<TVSeriesResponseType[]>;
    isFetching?: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<TVSeriesResponseType[], unknown>, Error>>;
};

// Component
export const TVSeriesList: FC<TVSeriesType> = ({ tvseries, isFetching = false, hasNextPage, fetchNextPage }) => {
    const tvSeriesCards: Array<CardProps> = useMemo(() => {
        return tvseries?.pages
            .flatMap((page) => page)
            .map((tv) => ({
                id: tv.id,
                title: tv.name,
                poster: tv.poster_path,
                mode: 'tv',
            }));
    }, [tvseries]);

    // Template
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
                {tvSeriesCards.map((tv) => {
                    if (tv) {
                        return <Card key={tv.id} mode={tv.mode} id={tv.id} title={tv.title} poster={tv.poster} />;
                    }
                })}
            </div>
            <div className="flex items-center justify-center mt-8">
                {hasNextPage ? (
                    <Button text="Watch more" ghost onClick={() => fetchNextPage()} loading={isFetching} />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default TVSeriesList;
