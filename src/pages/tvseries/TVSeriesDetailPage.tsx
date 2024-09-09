import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { TVSeriesInfo } from '../../components/Detail/TVSeriesInfo'
import { TVSeriesIntroduce } from '../../components/Detail/TVSeriesIntroduce'

export const TVSeriesDetailPage = () => {
  return (
    <div>
      <Header />
      <TVSeriesInfo />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <TVSeriesIntroduce />
      </div>
      <Footer />
    </div>
  )
}
