import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { MoviesPage } from './pages/movie/MoviesPage'
import { MovieDetailPage } from './pages/movie/MovieDetailPage'
import { TVSeriesPage } from './pages/tvseries/TVSeriesPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie">
            <Route path="" element={<MoviesPage />} />
            <Route path=":id" element={<MovieDetailPage />} />
            <Route path="?keyword=K" element={<MovieDetailPage />} />
          </Route>
          <Route path='/tv' element={<TVSeriesPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  )
}

export default App
