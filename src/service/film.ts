// App
import {
    CastResponseType,
    CastType,
    DisplayEnum,
    FilmResponseType,
    Mode,
    MovieDetailType,
    TVSeriesDetailType,
    VideoIntroduceResponseType,
    VideoIntroduceType,
} from '../utils/types';

// Internal
import { httpRequest } from '../utils/httpRequest';

// Constant
const MAXIMUM_SHOW_CAST = 5;
const MAXIMUM_SHOW_VIDEO = 5;

// Type
interface filmParam {
    page: number;
    type?: DisplayEnum;
    keyword?: string;
    mode: Mode;
}

// Mapper
// const convertDataToFilm: (
//     films: Array<MovieResponseType> | Array<TVSeriesResponseType>,
//     mode: 'movie' | 'tvseries',
// ) => Array<FilmResponseType> = (films, mode) => {
//     if (mode === "movie") {
//         return (films as Array<MovieResponseType>).map((film) => ({
//             id: film.id,
//             title: film.title,
//             overview: film.overview,
//             popularity: film.popularity,
//             poster_path: film.poster_path,
//             backdrop_path: film.backdrop_path,
//             release_date: film.release_date,
//             vote_average: film.vote_average,
//             vote_count: film.vote_count,
//             mode: mode,
//         }));
//     } else {
//         return (films as Array<TVSeriesResponseType>).map((film) => ({
//             id: film.id,
//             title: film.name,
//             overview: film.overview,
//             popularity: film.popularity,
//             poster_path: film.poster_path,
//             backdrop_path: film.backdrop_path,
//             release_date: film.release_date,
//             vote_average: film.vote_average,
//             vote_count: film.vote_count,
//             mode: mode,
//         }));
//     }
// };

// handle all option url ex: /type/keyword
// * get data films
export const getFilms = async ({ page, type, keyword, mode }: filmParam) => {
    let url = '';

    if (keyword && type) {
        url = `search/${mode}?query=${keyword}&type=${type}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
    } else if (keyword) {
        url = `search/${mode}?query=${keyword}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
    } else if (type) {
        url = `${mode}/${type}?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
    } else {
        url = `${mode}/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
    }

    console.log(url);
    const response = await httpRequest.get(url);
    const films: Array<FilmResponseType> = response.data?.results;

    if (!films) return [];

    return films;
};

// * get data movies similar
export const getFilmSimilar = async (similarId: string, mode: Mode) => {
    const url = `${mode}/${similarId}/similar?api_key=${process.env.API_KEY}`;

    const response = await httpRequest.get(url);
    const films: Array<FilmResponseType> = response.data?.results;

    if (!films) return [];

    return films;
};

// * get data detail film
export const getFilmDetail = async (id: string, mode: Mode) => {
    const response = await httpRequest.get(`${mode}/${id}?api_key=${process.env.API_KEY}`);
    const detail = response.data;

    if (!response) return;

    switch (mode) {
        case Mode.movie: {
            const movieDetail: MovieDetailType = {
                id: detail.id,
                title: detail.title,
                overview: detail.overview,
                genres: detail.genres,
                poster: detail.poster_path,
                backdrop: detail.backdrop_path,
                vote_average: detail.vote_average,
                vote_count: detail.vote_count,
            };

            return movieDetail;
        }

        case Mode.tvseries: {
            const tvDetail: TVSeriesDetailType = {
                id: detail.id,
                title: detail.name,
                overview: detail.overview,
                genres: detail.genres,
                poster: detail.poster_path,
                backdrop: detail.backdrop_path,
                vote_average: detail.vote_average,
                vote_count: detail.vote_count,
            };

            return tvDetail;
        }

        default:
            return null;
    }
};

// * get data cast of movie
export const getMovieCast = async (id: number | undefined, mode: Mode) => {
    if (!id) return [];

    const response = await httpRequest.get(`${mode}/${id}/credits?api_key=${process.env.API_KEY}`);
    const castData: Array<CastResponseType> = response.data?.cast;

    if (!response) return;

    const casts: Array<CastType> = castData.slice(0, MAXIMUM_SHOW_CAST).map((cast) => ({
        id: cast.id,
        name: cast.name,
        profile: cast.profile_path,
    }));

    return casts;
};

// * get data movie introduce
export const getMovieIntroduce = async (id: string, mode: Mode) => {
    if (!id) return [];

    const response = await httpRequest.get(`${mode}/${id}/videos?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const videoIntroducesData: Array<VideoIntroduceResponseType> = response.data?.results;

    if (!response) return;

    const videoIntroduces: Array<VideoIntroduceType> = videoIntroducesData
        .slice(0, MAXIMUM_SHOW_VIDEO)
        .map((videoIntroduce) => ({
            name: videoIntroduce.name,
            key: videoIntroduce.key,
            site: videoIntroduce.site,
            size: videoIntroduce.size,
            type: videoIntroduce.type,
            official: videoIntroduce.official,
            publishedAt: videoIntroduce.published_at,
        }));

    return videoIntroduces;
};
