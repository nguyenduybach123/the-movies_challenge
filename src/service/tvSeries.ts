import { httpRequest } from "../utils/httpRequest";
import { CastResponseType, CastType, MovieCardType, TVSeriesDetailType, TVSeriesResponseType, VideoIntroduceResponseType, VideoIntroduceType } from "../utils/types";

const MAXIMUM_SHOW_VIDEO = 5;
const MAXIMUM_SHOW_CAST = 5;

export const getTVSeries = async (page: number) => {
  const response = await httpRequest.get(`tv/popular?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
  const tvSeries:Array<TVSeriesResponseType> = response.data?.results ;

  if(!tvSeries)
    return;
  
  const cardTVSeries:Array<MovieCardType> = tvSeries.map(
    (tv) => ({
        id: tv.id,
        title: tv.name,
        poster: tv.poster_path,
        mode: "tv"
    })
)

  return cardTVSeries;
}

export const getTvSeriesByName = async (page: number, keyword: string) => {
  const response = await httpRequest.get(`search/tv?query=${keyword}&page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
  const tvSeries:Array<TVSeriesResponseType> = response.data?.results ;

  if(!tvSeries)
    return;
  
  const cardTVSeries:Array<MovieCardType> = tvSeries.map(
    (tv) => ({
        id: tv.id,
        title: tv.name,
        poster: tv.poster_path,
        mode: "tv"
    }));

  return cardTVSeries;
}

export const getTVSeriesByType = async (page: number, type: string) => {
  const response = await httpRequest.get(`tv/${type}?page=${page}&api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
  const tvByTypeData:Array<TVSeriesResponseType> = response.data?.results;

  if(!response)
    return;

  const TVsByType:Array<MovieCardType> = tvByTypeData.map(tv => ({
    id: tv.id,
    title: tv.name,
    poster: tv.poster_path,
    mode: "tv"
  }))

  return TVsByType;
}

export const getTVDetail = async (id: string | undefined) => {
    if(!id)
        return null;

    const response = await httpRequest.get(`tv/${id}?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
    const detail = response.data;

    if(!response)
      return;

    const tvDetail:TVSeriesDetailType = {
      id: detail.id,
      title: detail.name,
      overview: detail.overview,
      genres: detail.genres,
      poster: detail.poster_path,
      backdrop: detail.backdrop_path,
      vote_average: detail.vote_average,
      vote_count: detail.vote_count
    }

    return tvDetail;
  }

export const getTVCast = async (id: number | undefined) => {
    if(!id)
        return null;

    const response = await httpRequest.get(`tv/${id}/credits?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
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

export const getTVIntroduces = async (id: string | undefined) => {
    if(!id)  
      return [];

    const response = await httpRequest.get(`tv/${id}/videos?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
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