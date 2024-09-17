import cn from 'classnames';

import { CloseIcon } from '../../../../components/Icon'
import { useHomeContext } from '../../context/HomeContext';

export const TrailerModel = ({ trailerKey }: {trailerKey: string}) => {
    const { isOpenDialogTrailer, setIsOpenDialogTrailer } = useHomeContext();

    return (
        <div className={cn("fixed","top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]",{"hidden": !isOpenDialogTrailer})}>
            <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
                <CloseIcon width={'32px'} height={'32px'} className="absolute top-1 right-1 cursor-pointer z-10" colorHover={'text-red-main'} onClick={() => setIsOpenDialogTrailer(false)} />
                <iframe src={`https://www.youtube.com/embed/${trailerKey}`} className="w-full h-full mt-2"></iframe>
            </div>
        </div>
    );
}
