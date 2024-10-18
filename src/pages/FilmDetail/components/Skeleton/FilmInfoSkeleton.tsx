import { VideoSkeleton } from '../../../../components';
import { OverviewSkeleton } from '../../../../components/Skeleton';

const FilmInfoSkeleton = () => {
    return (
        <div className='relative px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10'>
            <div className="flex items-start -mx-4 max-h-fit">
                <div className="hidden md:block w-64 lg:w-96 px-4">
                    <VideoSkeleton className="rounded-3xl md:h-[300px] lg:h-[500px]" />
                </div>
                <div className="px-4 flex-1 flex flex-col justify-between -my-2 lg:-my-4">
                    <h2 className="w-2/5 py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
                        <div className="h-8 bg-gray-200 rounded-3xl w-full animate-pulse"></div>
                    </h2>
                    <ul className="flex items-center space-x-2 md:p-4 mb-3">
                        <div className="h-8 bg-gray-200 rounded-full w-20 mt-4 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-20 mt-4 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-20 mt-4 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-20 mt-4 animate-pulse"></div>
                    </ul>
                    <OverviewSkeleton />
                    <h3 className="text-white text-xl font-medium py-2">Casts</h3>
                    <div className="flex flex-wrap -mx-2 mt-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="w-28 px-2 mb-1">
                                <VideoSkeleton className="h-36 rounded-xl" />
                                <div className="h-2.5 bg-gray-200 rounded-md w-full mt-4 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FilmInfoSkeleton };
