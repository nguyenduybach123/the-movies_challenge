import { VideoSkeleton } from '../../../../components';

const FilmVideoIntroduceSkeleton = () => {
    return (
        <div className="py-2 px-4 md:px-8 lg:px-16">
            {Array.from({ length: 4 }).map((_, index) => (
                <div className="mb-12" key={index}>
                    <h2 className="w-2/5 py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
                        <div className="h-8 bg-gray-200 rounded-3xl w-full animate-pulse"></div>
                    </h2>
                    <VideoSkeleton className="h-[800px] rounded-md" />
                </div>
            ))}
        </div>
    );
};

export { FilmVideoIntroduceSkeleton };
