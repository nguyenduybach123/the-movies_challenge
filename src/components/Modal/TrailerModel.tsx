import React from 'react'
import { CloseIcon } from '../Icon'
import cx from 'classnames';
import { useGlobalContext } from '../../context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '../../utils/httpRequest';
import { VideoIntroduceResponseType, VideoIntroduceType } from '../../utils/constants';

export const TrailerModel = () => {
    const { idBannerSelected } = useGlobalContext();
    const { isOpenDialogTrailer, setIsOpenDialogTrailer} = useGlobalContext();

    const getMovieVideoById = async () => {
        const response = await httpRequest.get(`movie/${idBannerSelected}/videos?api_key=ae722869d6f14e76aebfb0d1fd961dd7`);
        const videosData:Array<VideoIntroduceResponseType> = response.data?.results;
        console.log(videosData);
        if(!response)
            return;

        const videoData:Array<VideoIntroduceResponseType> = videosData.slice(0,1);
        const video:VideoIntroduceType = {
            ...videoData[0],
            publishedAt: videoData[0].published_at
        }

        return video;
    }

    const { data: trailer, isPending, isError, error } = useQuery({
        queryKey: ['trailer'],
        queryFn: getMovieVideoById,
        enabled: isOpenDialogTrailer
    })
    
    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
    <div className={cx("fixed","top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]",{"hidden": !isOpenDialogTrailer})}>
        <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
            <CloseIcon width={'32px'} height={'32px'} className="absolute top-1 right-1 cursor-pointer z-10" colorHover={'text-red-main'} onClick={() => setIsOpenDialogTrailer(false)} />
            <iframe src={`https://www.youtube.com/embed/${trailer?.key}`} className="w-full h-full mt-2"></iframe>
        </div>
    </div>
    )
}
