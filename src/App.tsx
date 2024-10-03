// Core
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// App
import { DefaultLayout } from './layouts'
import { HomePage, MovieDetailPage, MoviesPage, TVSeriesDetailPage, TVSeriesPage } from './pages'

// Internal
import { HomeProvider } from './pages/Home/context/HomeContext'

// Contanst
const queryClient = new QueryClient();

// Component
function App() {

  // Templates
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <DefaultLayout>
            <HomeProvider>
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
            </HomeProvider>
          </DefaultLayout>
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;