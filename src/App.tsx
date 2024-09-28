import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { HomePage } from './pages/Home/HomePage'
import { MoviesPage } from './pages/Movie/MoviesPage'
import { MovieDetailPage } from './pages/Movie/MovieDetailPage'
import { TVSeriesPage } from './pages/Tvseries/TVSeriesPage'
import { TVSeriesDetailPage } from './pages/Tvseries/TVSeriesDetailPage'
import { DefaultLayout } from './layouts/DefaultLayout/DefaultLayout'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <DefaultLayout>
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
            </Routes>
          </DefaultLayout>
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;