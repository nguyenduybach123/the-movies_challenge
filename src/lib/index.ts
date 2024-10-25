// Core
import axios from 'axios';

// App
//import { FilmResponseType } from '@/types';

export const httpRequest = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

// httpRequest.interceptors.response.use(
//     (response) => {
//         if (response.config.method === 'get') {
//             if (response.config.url?.includes('movie') || response.config.url?.includes('tv')) {
//                 const filmList = response.data.results as Array<FilmResponseType>;
//                 response.data.results = filmList.forEach((film) => {
//                     return {
//                         id: film.id,
//                         overview: film.overview,
//                         popularity: film.popularity,
//                         release_date: film.release_date,
//                         title: film.title,
//                         name: film.name,
//                         vote_average: film.vote_average,
//                         vote_count: film.vote_count,
//                         poster_path:
//                             film.poster_path ??
//                             'https://images.pexels.com/photos/25772141/pexels-photo-25772141/free-photo-of-cho-v-t-nuoi-d-th-ng-m-t-m-i.jpeg?auto=compress&cs=tinysrgb&w=600',
//                         backdrop_path:
//                             'https://images.pefilm.backdrop_path ??xels.com/photos/25772141/pexels-photo-25772141/free-photo-of-cho-v-t-nuoi-d-th-ng-m-t-m-i.jpeg?auto=compress&cs=tinysrgb&w=600',
//                     };
//                 });
//             }
//         }

//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );
