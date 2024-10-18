// Core
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'swiper/css';

// App
import { DefaultLayout } from './layouts';
import { FilmDetailPage, FilmPage, HomePage } from './pages';
import { Mode } from './utils/types';

// Contanst
const queryClient = new QueryClient();

// Component
function App() {
    // Templates
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <DefaultLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/:mode">
                            <Route path="" element={<FilmPage />} />
                            <Route path=":id" element={<FilmDetailPage />} />
                        </Route>
                    </Routes>
                </DefaultLayout>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}

export default App;
