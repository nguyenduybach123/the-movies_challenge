// Core
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// App
import { DisplayEnum } from '../../utils/types';
import { getMovieCast, getMovieDetail, getMovieIntroduce } from '../../service/movie';
import { CardSlider } from '../../components/Card/CardSlider';

// Internal
import { MovieInfo, MovieIntroduce } from './components';

// Component
export const MovieDetailPage = () => {
    // Hook
    const { id } = useParams();

    // Queries
    const {
        data: movieDetail,
        isError: isErrorDetail,
        error: errorDetail,
    } = useQuery({
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
    if (isErrorDetail) {
        return <span>Error: {errorDetail.message}</span>;
    }

    if (isErrorIntroduce) {
        return <span>Error: {errorIntroduce.message}</span>;
    }

    //Template
    return (
        <>
            <MovieInfo detailMovie={movieDetail} casts={casts ? casts : []} />
            <div className="bg-black-main md:px-4 lg:px-8 md:py-8 lg:py-16">
                <MovieIntroduce
                    introduces={movieIntroduces ? movieIntroduces : []}
                    isFetching={isMovieIntroducePending}
                />
                <div className="max-w-screen-2xl mx-auto">
                    <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="movie" />
                </div>
            </div>
        </>
    );
};
