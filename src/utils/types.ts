// Data Props
export type QueryMovieParamType = {
    key: Array<string>;
    fn: (page: number) => Promise<MovieResponseType[]>;
};

export type QueryTVSeriesParamType = {
    key: Array<string>;
    fn: (page: number) => Promise<TVSeriesResponseType[]>;
};

export type MovieResponseType = {
    id: number;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    title: string;
    name: string;
    video: false;
    vote_average: number;
    vote_count: number;
};

export type TVSeriesResponseType = {
    id: number;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    name: string;
    video: false;
    vote_average: number;
    vote_count: number;
};

type GenreType = {
    id: number;
    name: string;
};

export type MovieDetailType = {
    id: number;
    title: string;
    overview: string;
    genres: Array<GenreType>;
    poster: string;
    backdrop: string;
    vote_average: number;
    vote_count: number;
};

export type TVSeriesDetailType = {
    id: number;
    title: string;
    overview: string;
    genres: Array<GenreType>;
    poster: string;
    backdrop: string;
    vote_average: number;
    vote_count: number;
};

export type CastResponseType = {
    id: string;
    name: string;
    profile_path: string;
};

export type CastType = {
    id: string;
    name: string;
    profile: string;
};

export type VideoIntroduceResponseType = {
    name: string;
    key: string;
    site?: string;
    size?: number;
    type?: string;
    official: boolean;
    published_at: string;
};

export type VideoIntroduceType = {
    name: string;
    key: string;
    site?: string;
    size?: number;
    type?: string;
    official: boolean;
    publishedAt: string;
};

export enum DisplayEnum {
    TopRated = 'top_rated',
    Popular = 'popular',
    Similar = 'similar',
}

// Component Props
export interface ComponentProps {
    className?: string;
}

export interface CardProps extends ComponentProps {
    id: number;
    title: string;
    poster: string;
    mode: 'movie' | 'tv';
}
