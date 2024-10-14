// Core
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum } from '../../utils/types';
import { getTVCast, getTVSeriesDetail, getTVSeriesIntroduce } from '../../service/tvSeries';
import { CardSlider, NotFoundQuery } from '../../components';

// Internal
import { TVSeriesInfo, TVSeriesIntroduce } from './components';

// Component
export const TVSeriesDetailPage = () => {
    // Hooks
    const { id } = useParams();

    // Queries
    const { data: tvDetail, isError: isErrorDetail } = useQuery({
        queryKey: ['tvseriesdetail', id],
        queryFn: () => getTVSeriesDetail(id),
        refetchOnWindowFocus: false,
    });

    const tvId = tvDetail?.id;

    const { data: casts } = useQuery({
        queryKey: ['tvseriescasts', tvId],
        queryFn: () => getTVCast(tvId),
        enabled: !!tvId,
        refetchOnWindowFocus: false,
    });

    const {
        data: tvIntroduces,
        isPending: isTVIntroducePending,
        isError: isErrorIntroduce,
    } = useQuery({
        queryKey: ['tvseriesintroduce', tvId],
        queryFn: () => getTVSeriesIntroduce(id),
        refetchOnWindowFocus: false,
    });

    // Effects
    // * sync scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tvDetail]);

    // Templates
    return (
        <>
            {isErrorDetail ? <NotFoundQuery /> : <TVSeriesInfo detailTV={tvDetail} casts={casts ? casts : []} />}
            <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
                {isErrorIntroduce ? (
                    <NotFoundQuery />
                ) : (
                    <TVSeriesIntroduce
                        introduces={tvIntroduces ? tvIntroduces : []}
                        isFetching={isTVIntroducePending}
                    />
                )}
                <div className="max-w-screen-2xl mx-auto">
                    <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="tv" />
                </div>
            </div>
        </>
    );
};
