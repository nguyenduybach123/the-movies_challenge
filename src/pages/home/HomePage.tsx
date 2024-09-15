import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { TrailerModel } from './components/Modal/TrailerModel'
import { DisplayEnum } from '../../utils/types'
import { BannerSlider } from './components/Slide/BannerSlider'
import { CardSlider } from '../../components/Slider/CardSlider'

export const HomePage = () => {
  return (
    <DefaultLayout>
      <TrailerModel />
      <BannerSlider />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <CardSlider title="Trending Movies" displayType={DisplayEnum.Popular} mode="movie" />
        <CardSlider title="Top Rated Movies" displayType={DisplayEnum.TopRated} mode="movie" />
        <CardSlider title="Trending TV" displayType={DisplayEnum.Popular} mode="tv" />
        <CardSlider title="Top Rated TV" displayType={DisplayEnum.TopRated} mode="tv" />
      </div>
    </DefaultLayout>
  )
}
