// Core
import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum, Mode } from '../../utils/types';
import { getMovieCast, getMovieDetail, getMovieIntroduce } from '../../service/movie';
import { CardSlider } from '../../components/Card/CardSlider';

// Internal
import { NotFoundQuery } from '../../components';
import { FilmInfo, FilmVideoIntroduce } from './components';

// Type
interface FilmDetailPageProps {
    mode: Mode;
}

// Component
export const FilmDetailPage: FC<FilmDetailPageProps> = ({ mode }) => {
    // Hook
    const { id } = useParams();

    // Queries
    const { data: movieDetail, isError: isErrorDetail } = useQuery({
        queryKey: ['detail', id],
        queryFn: () => getMovieDetail(id),
        refetchOnWindowFocus: false,
    });

    const movieId = movieDetail?.id;

    const { data: casts } = useQuery({
        queryKey: ['casts', movieId],
        queryFn: () => getMovieCast(movieId),
        enabled: !!movieId,
        refetchOnWindowFocus: false,
    });

    const {
        data: movieIntroduces,
        isPending: isMovieIntroducePending,
        isError: isErrorIntroduce,
        error: errorIntroduce,
    } = useQuery({
        queryKey: ['videointroduce', movieId],
        queryFn: () => getMovieIntroduce(id),
        refetchOnWindowFocus: false,
    });

    // Effect
    // * srcoll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieDetail]);

    // Templates

    if (isErrorIntroduce) {
        return <span>Error: {errorIntroduce.message}</span>;
    }

    //Template
    return (
        <>
            {isErrorDetail ? <NotFoundQuery /> : <FilmInfo detailMovie={movieDetail} casts={casts ? casts : []} />}
            <div className="bg-black-main md:px-4 lg:px-8 md:py-8 lg:py-16">
                {isErrorIntroduce ? (
                    <NotFoundQuery />
                ) : (
                    <FilmVideoIntroduce
                        introduces={movieIntroduces ? movieIntroduces : []}
                        isFetching={isMovieIntroducePending}
                    />
                )}
                <div className="max-w-screen-2xl mx-auto">
                    <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode={mode} />
                </div>
            </div>
        </>
    );
};
