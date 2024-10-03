// Core
import { useQuery } from '@tanstack/react-query'

// App
import { DisplayEnum } from '../../utils/types'
import { getBannerMovies, getVideoBannerById } from '../../service/banner'

// Internal
import { BannerSlider, TrailerModal } from './components'
import { useHomeContext } from './context/HomeContext'
import { CardSlider } from '../../components'

// Component
export const HomePage = () => {
  // Context
  const { idBannerSelected, isOpenDialogTrailer } = useHomeContext();

  // Queries
  const {data: banners , isFetching, isError: isErrorBanner, error: errorBanner} = useQuery({
    queryKey: ['banner'],
    queryFn: getBannerMovies,
  })

  const { data: trailer, isFetching: isTrailerFetching, isError: isErrorTrailer, error: errorTrailer } = useQuery({
      queryKey: ['trailer'],
      queryFn: () => getVideoBannerById(idBannerSelected),
      enabled: isOpenDialogTrailer
  })

  // Template
  if (isErrorBanner) {
      return <span>Error: {errorBanner.message}</span>
  }

  if (isErrorTrailer) {
    return <span>Error: {errorTrailer.message}</span>
  }

  return (
    <>
      <TrailerModal trailerKey={trailer ? trailer.key : ""} isFetching={isTrailerFetching} />
      <BannerSlider data={banners ? banners : []} isFetching={isFetching} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <CardSlider title="Trending Movies" displayType={DisplayEnum.Popular} mode="movie" />
        <CardSlider title="Top Rated Movies" displayType={DisplayEnum.TopRated} mode="movie" />
        <CardSlider title="Trending TV" displayType={DisplayEnum.Popular} mode="tv" />
        <CardSlider title="Top Rated TV" displayType={DisplayEnum.TopRated} mode="tv" />
      </div>
    </>
  );
}