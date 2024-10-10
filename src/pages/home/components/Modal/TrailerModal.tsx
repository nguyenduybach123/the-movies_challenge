// Core
import { FC } from 'react';
import cn from 'classnames';

// App
import { CloseIcon, VideoSkeleton } from '../../../../components';

// Component
export const TrailerModal: FC<{
    trailerKey: string;
    isFetching: boolean;
    isOpen: boolean;
    onCloseTrailer: () => void;
}> = ({ trailerKey, isOpen, isFetching, onCloseTrailer = () => {} }) => {
    if (!isOpen) {
        trailerKey = '';
    }

    // Template
    return (
        <div
            className={cn('fixed top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]', {
                hidden: !isOpen,
            })}
        >
            <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
                <CloseIcon
                    width={'30px'}
                    height={'30px'}
                    className="absolute top-1 right-1 cursor-pointer z-10 hover:fill-[#ff0000]"
                    onClick={() => {
                        onCloseTrailer();
                    }}
                />
                {!isFetching ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        className="w-full h-full p-1 mt-2"
                    ></iframe>
                ) : (
                    <VideoSkeleton width="100%" height="100%" />
                )}
            </div>
        </div>
    );
};

export default TrailerModal;
