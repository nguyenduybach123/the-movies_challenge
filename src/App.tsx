import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { HomePage } from './pages/Home/HomePage'
import { MoviesPage } from './pages/Movie/MoviesPage'
import { MovieDetailPage } from './pages/Movie/MovieDetailPage'
import { TVSeriesPage } from './pages/Tvseries/TVSeriesPage'
import { TVSeriesDetailPage } from './pages/Tvseries/TVSeriesDetailPage'
import { NotFoundPage } from './pages/Error/NotFoundPage'
import { InternalServerPage } from './pages/Error/InternalServerPage'

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
            </Route>
            <Route path="/tv">
              <Route path="" element={<TVSeriesPage />} />
              <Route path=":id" element={<TVSeriesDetailPage />} />
            </Route>
            <Route path="/error">
              <Route path="404" element={<NotFoundPage />} />
              <Route path="505" element={<InternalServerPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  )
}

export default App
