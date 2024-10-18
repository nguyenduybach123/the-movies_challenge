// Core
import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum, Mode } from '../../utils/types';
import { CardSlider } from '../../components/Card/CardSlider';
import { getFilmCast, getFilmDetail, getFilmIntroduce } from '../../service/film';

// Internal
import { NotFoundQuery } from '../../components';
import { FilmInfo, FilmVideoIntroduce } from './components';
import { FilmInfoSkeleton, FilmVideoIntroduceSkeleton } from './components/Skeleton';

// Type
interface FilmDetailPageProps {
    mode: Mode;
}

// Component
export const FilmDetailPage: FC<FilmDetailPageProps> = ({ mode }) => {
    // Hook
    const { id } = useParams();

    // Queries
    const {
        data: filmDetail,
        isFetching: isFilmDetailFetching,
        isError: isErrorDetail,
    } = useQuery({
        queryKey: ['detail', id, mode],
        queryFn: () => getFilmDetail(id, mode),
        refetchOnWindowFocus: false,
    });

    const filmId = filmDetail?.id;

    const { data: casts } = useQuery({
        queryKey: ['casts', filmId, mode],
        queryFn: () => getFilmCast(filmId, mode),
        enabled: !!filmId,
        refetchOnWindowFocus: false,
    });

    const {
        data: movieIntroduces,
        isFetching: isFilmIntroduceFetching,
        isError: isErrorIntroduce,
    } = useQuery({
        queryKey: ['videointroduce', filmId, mode],
        queryFn: () => getFilmIntroduce({ id: filmId, mode }),
        refetchOnWindowFocus: false,
    });

    // Effect
    // * srcoll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [filmDetail]);

    //Template
    return (
        <>
            {isErrorDetail && <NotFoundQuery />}
            {isFilmDetailFetching && <FilmInfoSkeleton />}
            {filmDetail && <FilmInfo detailMovie={filmDetail} casts={casts ? casts : []} />}
            <div className="bg-black-main md:px-4 lg:px-8 md:py-8 lg:py-16">
                {isErrorIntroduce && <NotFoundQuery />}
                {isFilmIntroduceFetching && <FilmVideoIntroduceSkeleton />}
                {movieIntroduces && <FilmVideoIntroduce introduces={movieIntroduces} />}
                <div className="max-w-screen-2xl mx-auto">
                    <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode={mode} />
                </div>
            </div>
        </>
    );
};
