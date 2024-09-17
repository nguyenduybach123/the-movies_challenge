import { httpRequest } from "../utils/httpRequest";
import { CastResponseType, CastType, MovieCardType, MovieDetailType, MovieResponseType, VideoIntroduceResponseType, VideoIntroduceType } from "../utils/types";

const MAXIMUM_SHOW_CAST = 5;
const MAXIMUM_SHOW_VIDEO = 5;

export const getMovies = async (page: number) => {
    const response = await httpRequest.get(`movie/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const movies:Array<MovieResponseType> = response.data?.results ;

    if(!movies)
      return [];
    
    const cardMovies:Array<MovieCardType> = movies.map(
      (movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          mode: "movie"
      })
  )

    return cardMovies;
}

export const getMoviesByName = async (page: number, keyword: string) => {
  const response = await httpRequest.get(`search/movie?query=${keyword}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
  const movies:Array<MovieResponseType> = response.data?.results ;

    if(!movies)
      return [];
    
    const cardMovies:Array<MovieCardType> = movies.map(
      (movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          mode: "movie"
      }));

    return cardMovies;
}

export const getMoviesByType = async (page: number, type: string) => {
  const response = await httpRequest.get(`movie/${type}?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
  const moviesByTypeData:Array<MovieResponseType> = response.data?.results;

  if(!response)
    return;

  const moviesByType:Array<MovieCardType> = moviesByTypeData.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    mode: "movie"
  }))

  return moviesByType;
}

export const getMovieDetail = async (id: string | undefined) => {
    if(!id)
        return null;

    const response = await httpRequest.get(`movie/${id}?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const detail = response.data;

    if(!response)
      return;

    const movieDetail:MovieDetailType = {
      id: detail.id,
      title: detail.title,
      overview: detail.overview,
      genres: detail.genres,
      poster: detail.poster_path,
      backdrop: detail.backdrop_path,
      vote_average: detail.vote_average,
      vote_count: detail.vote_count
    }

    return movieDetail;
  }

export const getMovieCast = async (id: number | undefined) => {
    if(!id)
        return [];

    const response = await httpRequest.get(`movie/${id}/credits?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const castData:Array<CastResponseType> = response.data?.cast;

    if(!response)
      return;

    const casts:Array<CastType> = castData.slice(0, MAXIMUM_SHOW_CAST).map(cast => ({
      id: cast.id,
      name: cast.name,
      profile: cast.profile_path
    }))

    return casts;
}


export const getMovieIntroduces = async (id: string | undefined) => {
    if(!id)
        return [];

    const response = await httpRequest.get(`movie/${id}/videos?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const videoIntroducesData:Array<VideoIntroduceResponseType> = response.data?.results;
    
    if(!response)
      return;

    const videoIntroduces:Array<VideoIntroduceType> = videoIntroducesData.slice(0, MAXIMUM_SHOW_VIDEO).map(videoIntroduce => ({
      name: videoIntroduce.name,
      key: videoIntroduce.key,
      site: videoIntroduce.site,
      size: videoIntroduce.size,
      type: videoIntroduce.type,
      official: videoIntroduce.official,
      publishedAt: videoIntroduce.published_at
    }))

    return videoIntroduces;
}