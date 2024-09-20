import { useQuery } from '@tanstack/react-query'

import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { TrailerModel } from './components/Modal/TrailerModel'
import { BannerSlider } from './components/Slide/BannerSlider'
import { CardSlider } from '../../components/Slider/CardSlider'
import { DisplayEnum } from '../../utils/types'
import { useHomeContext } from './context/HomeContext'
import { getBannerMovies, getVideoBannerById } from '../../service/banner'

export const HomePage = () => {
  const { idBannerSelected, isOpenDialogTrailer } = useHomeContext();

  const {data: banners , isPending, isError: isErrorBanner, error: errorBanner} = useQuery({
    queryKey: ['banner'],
    queryFn: getBannerMovies,
  })

  const { data: trailer, isPending: isTrailerPending, isError: isErrorTrailer, error: errorTrailer } = useQuery({
      queryKey: ['trailer'],
      queryFn: () => getVideoBannerById(idBannerSelected),
      enabled: isOpenDialogTrailer
  })
  
  if (isErrorBanner) {
      return <span>Error: {errorBanner.message}</span>
  }

  if (isErrorTrailer) {
    return <span>Error: {errorTrailer.message}</span>
  }

  return (
    <DefaultLayout>
      <TrailerModel trailerKey={trailer ? trailer.key : ""} isFetching={isTrailerPending} />
      <BannerSlider data={banners ? banners : []} isFetching={isPending} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <CardSlider title="Trending Movies" displayType={DisplayEnum.Popular} mode="movie" />
        <CardSlider title="Top Rated Movies" displayType={DisplayEnum.TopRated} mode="movie" />
        <CardSlider title="Trending TV" displayType={DisplayEnum.Popular} mode="tv" />
        <CardSlider title="Top Rated TV" displayType={DisplayEnum.TopRated} mode="tv" />
      </div>
    </DefaultLayout>
  );
}