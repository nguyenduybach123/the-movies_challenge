// Core
import { FC, useMemo } from 'react';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

// App
import { Button } from '../../../components/Button';
import Card from '../../../components/Card/Card';
import { CardProps, MovieResponseType } from '../../../utils/types';

// Type
type MovieListType = {
    movies: InfiniteData<MovieResponseType[]>;
    isFetching: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<MovieResponseType[], unknown>, Error>>;
};

// Component
export const MovieList: FC<MovieListType> = ({ movies, isFetching, fetchNextPage, hasNextPage }) => {
    const movieCards: Array<CardProps> = useMemo(() => {
        return movies.pages
            .flatMap((page) => page)
            .map((movie) => ({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                mode: 'movie',
            }));
    }, [movies]);

    // Templates
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
                {movieCards.map((movie) => {
                    return (
                        <Card
                            key={movie.id}
                            mode={movie.mode}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                        />
                    );
                })}
            </div>
            {hasNextPage && (
                <div className="flex items-center justify-center mt-8">
                    <Button text="Watch more" ghost onClick={fetchNextPage} loading={isFetching} />
                </div>
            )}
        </>
    );
};

export default MovieList;
