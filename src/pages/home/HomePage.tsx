// Core
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// App
import { DisplayEnum } from '../../utils/types';
import { getBannerMovies, getVideoBannerById } from '../../service/banner';

// Internal
import { TrailerModal } from './components';
import Carousel from '../../components/Carousel';
import { CardSlider, NotFoundQuery } from '../../components';
import Loading from '../../components/Loading';
import { Banner } from './components';

// Component
export const HomePage = () => {
    // State
    const [isOpenDialogTrailer, setIsOpenDialogTrailer] = useState(false);
    const [idBannerSelected, setIdBannerSelected] = useState(NaN);

    // Queries
    // * fetch data banners
    const {
        data: bannerData,
        isFetching,
        isError: isErrorBanner,
    } = useQuery({
        queryKey: ['banner'],
        queryFn: getBannerMovies,
        refetchOnWindowFocus: false,
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
        refetchOnWindowFocus: false,
    });

    const banners = bannerData || [];

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
                <Loading />
            ) : (
                <>
                    <TrailerModal
                        trailerKey={trailer ? trailer.key : ''}
                        isOpen={isOpenDialogTrailer}
                        isFetching={isTrailerFetching}
                        onCloseTrailer={() => setIsOpenDialogTrailer(false)}
                    />
                    <Carousel
                        centeredSlides={true}
                        effect={'coverflow'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                    >
                        {banners.map((banner) => (
                            <Banner
                                id={banner.id}
                                name={banner.name}
                                overview={banner.overview}
                                poster={banner.poster}
                                backdrop={banner.backdrop}
                                onActiveTrailer={() => {
                                    setIdBannerSelected(banner.id);
                                    setIsOpenDialogTrailer(true);
                                }}
                            />
                        ))}
                    </Carousel>
                    <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
                        <div className="max-w-screen-2xl mx-auto">
                            <CardSlider title="Trending Movies" displayType={DisplayEnum.Popular} mode="movie" />
                            <CardSlider title="Top Rated Movies" displayType={DisplayEnum.TopRated} mode="movie" />
                            <CardSlider title="Trending TV" displayType={DisplayEnum.Popular} mode="tv" />
                            <CardSlider title="Top Rated TV" displayType={DisplayEnum.TopRated} mode="tv" />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
