import { MovieInfo } from '../../components/Detail/MovieInfo'
import { MovieIntroduce } from '../../components/Detail/MovieIntroduce'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'


export const MovieDetailPage = () => {
  return (
    <div>
      <Header />
      <MovieInfo />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <MovieIntroduce />
      </div>
      <Footer />
    </div>
  )
}
