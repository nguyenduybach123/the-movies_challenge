// Core
import { FC, useMemo } from 'react';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

// App
import { Button } from '../../../components/Button';
import Card from '../../../components/Card/Card';
import { CardProps, FilmResponseType, Mode } from '../../../types';

// Type
interface FilmListProps {
    filmList: InfiniteData<FilmResponseType[]>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<FilmResponseType[], unknown>, Error>>;
    mode: Mode;
}

// Component
export const FilmList: FC<FilmListProps> = ({ filmList, isFetchingNextPage, fetchNextPage, hasNextPage, mode }) => {
    const filmCards: Array<CardProps> = useMemo(() => {
        return filmList.pages
            .flatMap((page) => page)
            .map((film) => ({
                id: film?.id,
                title: mode === Mode.movie ? film?.title : film?.name,
                poster: film?.poster_path,
                mode: mode,
            }));
    }, [filmList, mode]);

    // Templates
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
                {filmCards.map((film) => {
                    return <Card key={film.id} mode={film.mode} id={film.id} title={film.title} poster={film.poster} />;
                })}
            </div>
            {hasNextPage && (
                <div className="flex items-center justify-center mt-8">
                    <Button text="Watch more" ghost onClick={fetchNextPage} loading={isFetchingNextPage} />
                </div>
            )}
        </>
    );
};

export default FilmList;
