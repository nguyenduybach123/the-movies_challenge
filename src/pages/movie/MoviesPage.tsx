// Core
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

// App
import { DisplayEnum, QueryMovieParamType } from '../../utils/types';
import { getMovies } from '../../service/movie';
import { NotFoundQuery, NotFoundResult, SearchBar } from '../../components';

// Internal
import { MovieList } from './components';
import { CardSkeleton } from '../../components/Skeleton';

// Component
export const MoviesPage = () => {
    // States
    const [searchParams] = useSearchParams();

    // Queries
    let queryParams: QueryMovieParamType = {
        key: ['movies'],
        fn: (page) => getMovies({ page }),
    };

    const keywordParam = searchParams.get('keyword');
    const typeParam = searchParams.get('type');
    if (keywordParam !== '' && keywordParam !== null) {
        queryParams = {
            key: ['search', keywordParam],
            fn: (page) => getMovies({ page, keyword: keywordParam }),
        };
    } else if (typeParam !== '' && typeParam !== null) {
        queryParams = {
            key: ['type', typeParam],
            fn: (page) => getMovies({ page, type: typeParam as DisplayEnum }),
        };
    }

    // HTTP GET MOVIES
    const {
        data: movies,
        isError,
        isFetching,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [...queryParams.key],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await queryParams.fn(pageParam);

            return response;
        },
        getNextPageParam: (lastpage, pages) => {
            if (lastpage && lastpage.length < 20) {
                return undefined;
            }
            return pages.length + 1;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
    });

    // Effefects
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Templates
    return (
        <>
            <div className="relative h-48 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-white">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
                    Movies
                </span>
            </div>
            <div className="bg-black-main px-8 py-4 md:px-16 md:py-8">
                <div className="max-w-screen-2xl mx-auto">
                    <SearchBar />
                    {isError && <NotFoundQuery />}
                    {isLoading && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 -mx-2 mt-16">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </div>
                    )}
                    {movies?.pages[0].length ? (
                        <MovieList
                            movies={movies}
                            isFetching={isFetching}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                        />
                    ) : (
                        <NotFoundResult keyword={keywordParam ? keywordParam : ''} />
                    )}
                </div>
            </div>
        </>
    );
};

export default MoviesPage;
