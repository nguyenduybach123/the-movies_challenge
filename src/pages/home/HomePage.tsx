// Core
import { useQuery } from '@tanstack/react-query';

// App
import { DisplayEnum } from '../../utils/types';
import { useHomeContext } from './context/HomeContext';
import { getBannerMovies, getVideoBannerById } from '../../service/banner';

import { BannerSlider, TrailerModal } from './components';
import { BaseSpinner, CardSlider, NotFoundQuery } from '../../components';

// Component
export const HomePage = () => {
    // Context
    const { idBannerSelected, isOpenDialogTrailer } = useHomeContext();

    // Queries
    // * fetch data banners
    const {
        data: banners,
        isFetching,
        isError: isErrorBanner,
    } = useQuery({
        queryKey: ['banner'],
        queryFn: getBannerMovies,
    });

    // * fetch data trailer
    const {
        data: trailer,
        isFetching: isTrailerFetching,
        isError: isErrorTrailer,
    } = useQuery({
        queryKey: ['trailer'],
        queryFn: () => getVideoBannerById(idBannerSelected),
        enabled: isOpenDialogTrailer,
    });

    // Templates
    if (isErrorBanner) {
        return <NotFoundQuery />;
    }

    if (isErrorTrailer) {
        return <NotFoundQuery />;
    }

    return (
        <>
            {isFetching ? (
                <div className="flex justify-center items-center w-screen h-screen">
                    <BaseSpinner width={50} height={50} />
                </div>
            ) : (
                <>
                    <TrailerModal trailerKey={trailer ? trailer.key : ''} isFetching={isTrailerFetching} />
                    <BannerSlider data={banners ? banners : []} />
                    <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
                        <CardSlider title="Trending Movies" displayType={DisplayEnum.Popular} mode="movie" />
                        <CardSlider title="Top Rated Movies" displayType={DisplayEnum.TopRated} mode="movie" />
                        <CardSlider title="Trending TV" displayType={DisplayEnum.Popular} mode="tv" />
                        <CardSlider title="Top Rated TV" displayType={DisplayEnum.TopRated} mode="tv" />
                    </div>
                </>
            )}
        </>
    );
};
