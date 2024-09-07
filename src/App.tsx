import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { MoviesPage } from './pages/movie/MoviesPage'
import { MovieDetailPage } from './pages/movie/MovieDetailPage'
import { TVSeriesPage } from './pages/tvseries/TVSeriesPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path='/tv' element={<TVSeriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
