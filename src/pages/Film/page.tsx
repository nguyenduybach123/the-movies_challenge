// Core
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

// App
import { getFilms } from '../../service/film';
import { DisplayEnum, FilmResponseType, Mode } from '../../utils/types';
import { NotFoundQuery, NotFoundResult, SearchBar } from '../../components';

// Internal
import { FilmList } from './components';
import { CardSkeleton } from '../../components/Skeleton';

// Type
interface FilmPageProps {
    mode: Mode;
}

interface QueryFilmParamProps {
    key: Array<string>;
    fn: (page: number) => Promise<FilmResponseType[]>;
}

// Component
export const FilmPage: FC<FilmPageProps> = ({ mode }) => {
    // States
    const [searchParams] = useSearchParams();

    // Queries
    let queryParams: QueryFilmParamProps = {
        key: ['films', mode],
        fn: (page) => getFilms({ page, mode }),
    };

    const keywordParam = searchParams.get('keyword');
    const typeParam = searchParams.get('type');
    if (keywordParam !== '' && keywordParam !== null) {
        queryParams = {
            key: ['search', keywordParam, mode],
            fn: (page) => getFilms({ page, keyword: keywordParam, mode: mode }),
        };
    } else if (typeParam !== '' && typeParam !== null) {
        queryParams = {
            key: ['type', typeParam, mode],
            fn: (page) => getFilms({ page, type: typeParam as DisplayEnum, mode: mode }),
        };
    }

    // HTTP GET MOVIES
    const {
        data: filmData,
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

    const films = filmData?.pages[0].length !== 0 ? filmData : undefined;
    // Templates
    return (
        <>
            <div className="relative h-48 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-white">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl uppercase font-bold z-10">
                    {mode}
                </span>
            </div>
            <div className="bg-black-main px-8 py-4 md:px-16 md:py-8">
                <div className="max-w-screen-2xl mx-auto">
                    <SearchBar key={mode} />
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
                    {films ? (
                        <FilmList
                            mode={mode}
                            films={films}
                            isFetching={isFetching}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                        />
                    ) : (
                        !isFetching && <NotFoundResult keyword={keywordParam ? keywordParam : ''} />
                    )}
                </div>
            </div>
        </>
    );
};

export default FilmPage;
