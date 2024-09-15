import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';

import { useHomeContext } from '../../context/HomeContext';
import { getVideoBannerById } from '../../../../service/banner';
import { CloseIcon } from '../../../../components/Icon'

export const TrailerModel = () => {
    const { idBannerSelected, isOpenDialogTrailer, setIsOpenDialogTrailer } = useHomeContext();

    const { data: trailer, isError, error } = useQuery({
        queryKey: ['trailer'],
        queryFn: () => getVideoBannerById(idBannerSelected),
        enabled: isOpenDialogTrailer
    })
    
    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
    <div className={cn("fixed","top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]",{"hidden": !isOpenDialogTrailer})}>
        <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
            <CloseIcon width={'32px'} height={'32px'} className="absolute top-1 right-1 cursor-pointer z-10" colorHover={'text-red-main'} onClick={() => setIsOpenDialogTrailer(false)} />
            <iframe src={`https://www.youtube.com/embed/${trailer?.key}`} className="w-full h-full mt-2"></iframe>
        </div>
    </div>
    )
}
