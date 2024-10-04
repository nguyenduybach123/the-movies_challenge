import React from "react"

export type DisplayDataType<T> = {
    data: T,
    isFetching?: boolean,
    onClick?: void
}

export type SpinnerType = {
    color?: string,
    width?: string | number,
    height?: string | number,
    className?: string
}

export type QueryMovieParamType = {
    key: Array<string>,
    fn: (page: number) => Promise<MovieResponseType[]>
}

export type QueryTVSeriesParamType = {
    key: Array<string>,
    fn: (page: number) => Promise<TVSeriesResponseType[]>
}

export type MovieResponseType = {
    id: number,
    overview: string,
    popularity: number,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    title: string,
    name: string,
    video: false,
    vote_average: number,
    vote_count: number
}

export type TVSeriesResponseType = {
    id: number,
    overview: string,
    popularity: number,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    name: string,
    video: false,
    vote_average: number,
    vote_count: number
}

type GenreType = {
    id: number,
    name: string
}

export type MovieDetailType = {
    id: number,
    title: string,
    overview: string,
    genres: Array<GenreType>,
    poster: string,
    backdrop: string,
    vote_average: number,
    vote_count: number
}

export type TVSeriesDetailType = {
    id: number,
    title: string,
    overview: string,
    genres: Array<GenreType>,
    poster: string,
    backdrop: string,
    vote_average: number,
    vote_count: number
}

export type CastResponseType = {
    id: string,
    name: string,
    profile_path: string
}

export type CastType = {
    id: string,
    name: string,
    profile: string
}

export type VideoIntroduceResponseType = {
    name: string,
    key: string,
    site?: string,
    size?: number,
    type?: string,
    official: boolean,
    published_at: string
}

export type VideoIntroduceType = {
    name: string,
    key: string,
    site?: string,
    size?: number,
    type?: string,
    official: boolean,
    publishedAt: string
}

export type BannerType = {
    id: number,
    name: string,
    overview: string,
    poster: string,
    backdrop: string
}

export enum DisplayEnum {
    TopRated = "top_rated",
    Popular = "popular",
    Similar = "similar"
}

export type CardType = {
    id: number,
    title: string,
    poster: string,
    isFetching: boolean,
    mode: 'movie' | 'tv'
}

export type CardSliderType = {
    title: string,
    displayType: DisplayEnum, mode: 'movie' | 'tv',
    similarId?: string
}

export type IconType = {
    width?: string | number,
    height?: string | number,
    colorHover?: string,
    className?: string,
    onClick?:  React.MouseEventHandler<SVGSVGElement> | undefined
}

export type ButtonType = {
    text?: string,
    size?: 'sm' | 'md' | 'lg',
    icon?: React.ReactNode,
    ghost?: boolean,
    loading?: boolean,
    to?: string,
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}

export type MenuItemType = {
    id: number,
    title: string,
    href: string,
    isActive: boolean
}