// Core
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

//App
import { DisplayEnum, QueryTVSeriesParamType } from '../../utils/types';
import { getTVSeries } from '../../service/tvSeries';
import { NotFoundResult, SearchBar } from '../../components';

// Internal
import { TVSeriesList } from './components';
import { NotFoundQuery } from '../../components/Exception';
import { CardSkeleton } from '../../components/Skeleton';

// Component
export const TVSeriesPage = () => {
    // Hook
    const [searchParams] = useSearchParams();

    // Queries
    let queryParams: QueryTVSeriesParamType = {
        key: ['tvseries'],
        fn: (page) => getTVSeries({ page }),
    };

    const keywordParam = searchParams.get('keyword');
    const typeParam = searchParams.get('type');
    if (keywordParam !== '' && keywordParam !== null) {
        queryParams = {
            key: ['tvsearch', keywordParam],
            fn: (page: number) => getTVSeries({ page, keyword: keywordParam }),
        };
    } else if (typeParam !== '' && typeParam !== null) {
        queryParams = {
            key: ['tvtype', typeParam],
            fn: (page: number) => getTVSeries({ page, type: typeParam as DisplayEnum }),
        };
    }

    // HTTP GET TVSERIES
    const {
        data: tvSeries,
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

    // Effect
    // * sync scroll to top
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
                    Tv Series
                </span>
            </div>
            <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
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
                    {tvSeries?.pages[0].length ? (
                        <TVSeriesList
                            tvseries={tvSeries}
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
