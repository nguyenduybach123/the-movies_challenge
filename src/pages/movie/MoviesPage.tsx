// Core
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

// App
import { DisplayEnum, MovieResponseType, QueryMovieParamType } from '../../utils/types';
import { getMovies } from '../../service/movie';
import { NotFoundQuery, NotFoundResult, SearchBar } from '../../components';

// Internal
import { MovieList } from './components';

// Constant
const defaultMovies: InfiniteData<MovieResponseType[], unknown> = {
    pages: [],
    pageParams: [],
};

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
        initialData: {
            pages: [],
            pageParams: [1],
        },
        refetchOnWindowFocus: false,
    });

    // Effefects
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Templates
    if (isError) {
        return <NotFoundQuery />;
    }

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
                    {isFetching ? (
                        <MovieList
                            movies={movies || defaultMovies}
                            isFetching={isFetching}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                        />
                    ) : movies.pages[0].length !== 0 ? (
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
