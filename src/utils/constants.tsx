import React from "react"

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

export type BannerType = {
    name: string,
    overview: string,
    poster: string,
    backdrop: string
}

export enum MovieDisplayEnum {
    TopRated = "top_rated",
    Trending = "trending",
    Popular = "popular",
    Upcoming = "upcoming",
    Similar = "similar"
}

export type MovieCardType = {
    title: string,
    poster: string
}

export type IconType = {
    width?: string | number,
    height?: string | number,
    className?: string,
    onClick?:  React.MouseEventHandler<SVGSVGElement> | undefined
}

export type ButtonType = {
    text?: string,
    size?: 'sm' | 'md' | 'lg',
    icon?: React.ReactNode,
    ghost?: boolean,
    to?: string,
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default',
    className?: string
}