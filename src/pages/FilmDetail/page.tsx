// Core
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum, Mode } from '@/types';
import { getFilmCast, getFilmDetail, getFilmIntroduce } from '@/service/api/film';
import { CardSlider, NotFound404, ServerErrorPartial500 } from '@/components';

// Internal
import { FilmInfo, FilmVideoIntroduce } from './components';
import { FilmInfoSkeleton, FilmVideoIntroduceSkeleton } from './components/Skeleton';

// Component
export const FilmDetailPage = () => {
    // Hook
    const { mode, id } = useParams<{ id: string; mode: Mode }>();

    const modeType = mode || Mode.movie;

    // Queries
    const {
        data: filmDetail,
        isFetching: isFilmDetailFetching,
        isError: isErrorDetail,
    } = useQuery({
        queryKey: ['detail', id, mode],
        queryFn: () => getFilmDetail(Number(id), modeType),
        refetchOnWindowFocus: false,
    });

    const filmId = filmDetail?.id;

    const { data: castList } = useQuery({
        queryKey: ['castList', filmId, modeType],
        queryFn: () => getFilmCast(filmId, modeType),
        enabled: !!filmId,
        refetchOnWindowFocus: false,
    });

    const {
        data: movieIntroduces,
        isFetching: isFilmIntroduceFetching,
        isError: isErrorIntroduce,
    } = useQuery({
        queryKey: ['videointroduce', filmId, mode],
        queryFn: () => getFilmIntroduce({ id: filmId, mode: modeType }),
        refetchOnWindowFocus: false,
    });

    // Effect
    // * srcoll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [filmDetail]);

    //Template
    if (!mode || (mode !== Mode.movie && mode !== Mode.tvseries)) {
        return <NotFound404 />;
    }

    return (
        <>
            {isErrorDetail && <ServerErrorPartial500 />}
            {isFilmDetailFetching && <FilmInfoSkeleton />}
            {filmDetail && <FilmInfo filmInfo={filmDetail} castList={castList ? castList : []} />}
            <div className="bg-black-main md:px-4 lg:px-8 md:py-8 lg:py-16">
                {isErrorIntroduce && <ServerErrorPartial500 />}
                {isFilmIntroduceFetching && <FilmVideoIntroduceSkeleton />}
                {movieIntroduces && <FilmVideoIntroduce videoList={movieIntroduces} />}
                <div className="max-w-screen-2xl mx-auto">
                    <CardSlider
                        title="Similar"
                        displayType={DisplayEnum.Similar}
                        similarId={Number(id)}
                        mode={modeType}
                    />
                </div>
            </div>
        </>
    );
};
