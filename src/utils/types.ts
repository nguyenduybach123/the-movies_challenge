// Enum
export enum DisplayEnum {
    TopRated = 'top_rated',
    Popular = 'popular',
    Similar = 'similar',
}

export enum Mode {
    movie = 'movie',
    tvseries = 'tv',
}

// Data Props
export type FilmResponseType = {
    id: number;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    title: string;
    name: string;
    vote_average: number;
    vote_count: number;
    mode: Mode;
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

// Component Props
export interface ComponentProps {
    className?: string;
}

export interface CardProps extends ComponentProps {
    id: number;
    title: string;
    poster: string;
    mode: Mode;
}
