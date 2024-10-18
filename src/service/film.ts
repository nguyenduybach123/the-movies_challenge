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
import { BannerProps } from '../pages/Home/components/Banner/Banner';

// Constant
const MAXIMUM_SHOW_CAST = 5;
const MAXIMUM_SHOW_VIDEO = 5;
const INCLUDE_ADULT = false;
const API_KEY = 'ae722869d6f14e76aebfb0d1fd961dd7';
const LANGUAGE_DEFAULT = 'en-US';

// Type
interface FilmParamProps {
    page: number;
    type?: DisplayEnum;
    keyword?: string;
    mode: Mode;
}

interface FilmIntroduceParamProps {
    id: number | undefined;
    isTrailer?: boolean;
    mode: Mode;
}

interface ParamStringProps {
    search?: string;
    mode: Mode;
    type?: string;
}

interface QueryStringProps {
    query?: string;
    page?: number;
    include_adult?: boolean;
    language: string;
    api_key: string;
}

const MAXIMUM_BANNER = 5;

// * get data banner movies popular
export const getFilmBanners = async () => {
    const response = await httpRequest.get(`movie/popular?api_key=${API_KEY}`);
    const movies: Array<FilmResponseType> = response.data?.results;

    if (!movies) return;

    const bannerPopularMovies: Array<BannerProps> = movies.slice(0, MAXIMUM_BANNER).map((movie) => ({
        id: movie.id,
        name: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
    }));

    return bannerPopularMovies;
};

// handle all option url ex: /type/keyword
// * get data films
export const getFilms = async ({ page, type, keyword, mode }: FilmParamProps) => {
    const paramProps: ParamStringProps = {
        search: keyword ? 'search' : undefined,
        mode: mode,
        type: type ?? undefined,
    };

    const queryProps: QueryStringProps = {
        query: keyword ?? undefined,
        page: page ?? undefined,
        include_adult: INCLUDE_ADULT,
        language: LANGUAGE_DEFAULT,
        api_key: API_KEY,
    };

    const paramString = Object.values(paramProps)
        .filter((param) => param !== undefined)
        .join('/');

    const queriesString = Object.keys(queryProps)
        .map((key) =>
            queryProps[key as keyof QueryStringProps] ? `${key}=${queryProps[key as keyof QueryStringProps]}` : '',
        )
        .filter((queryString) => queryString !== '')
        .join('&');

    const url = paramString + '?' + queriesString;

    const response = await httpRequest.get(url);
    const films: Array<FilmResponseType> = response.data?.results;

    if (!films) return [];

    return films;
};

// * get data movies similar
export const getFilmSimilar = async (similarId: string, mode: Mode) => {
    const url = `${mode}/${similarId}/similar?api_key=${API_KEY}`;

    const response = await httpRequest.get(url);
    const films: Array<FilmResponseType> = response.data?.results;

    if (!films) return [];

    return films;
};

// * get data detail film
export const getFilmDetail = async (id: string | undefined, mode: Mode) => {
    const response = await httpRequest.get(`${mode}/${id}?api_key=${API_KEY}`);
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
export const getFilmCast = async (id: number | undefined, mode: Mode) => {
    if (!id) return [];

    const response = await httpRequest.get(`${mode}/${id}/credits?api_key=${API_KEY}`);
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
export const getFilmIntroduce = async ({ id, isTrailer = false, mode }: FilmIntroduceParamProps) => {
    if (!id) return [];

    const response = await httpRequest.get(`${mode}/${id}/videos?api_key=${API_KEY}`);
    const videoIntroducesData: Array<VideoIntroduceResponseType> = response.data?.results;

    if (!response) return;

    const videoIntroduces: Array<VideoIntroduceType> = videoIntroducesData
        .slice(0, isTrailer ? 1 : MAXIMUM_SHOW_VIDEO)
        .map((videoIntroduce) => ({
            ...videoIntroduce,
            publishedAt: videoIntroduce.published_at,
        }));

    return videoIntroduces;
};
