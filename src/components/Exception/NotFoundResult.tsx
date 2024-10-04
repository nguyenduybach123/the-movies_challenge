// Core
import { FC } from 'react';

// App
import { notResultSearchImage } from '../../assets';

// Component
export const NotFoundResult: FC<{ keyword: string }> = ({ keyword }) => {
    // Templates
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center text-white text-center">
                <h1 className="my-8 text-4xl font-bold tracking-wide">No Results Found For : {keyword}</h1>
                <img src={notResultSearchImage} width={150} height={150} />
                <h3 className="mt-5 text-2xl font-semibold tracking-normal">Don't give up</h3>
            </div>
        </div>
    );
};

export default NotFoundResult;
