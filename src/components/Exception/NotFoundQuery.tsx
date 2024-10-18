// App
import { notQueryImage } from '../../assets';

// Component
export const NotFoundQuery = () => {
    // Template
    return (
        <div className="flex justify-center items-center w-screen-2xl h-screen">
            <div className="flex flex-col justify-center items-center text-white text-center">
                <h1 className="my-8 text-4xl font-bold tracking-wide">Has Some Error :(( </h1>
                <h1 className="text-9xl text-center [text-shadow:_0_4px_8px_#ff0000] font-bold">500</h1>
                <img src={notQueryImage} alt="error" width={200} height={200} />
                <h3 className="mt-5 text-2xl font-semibold tracking-normal">Please Calm Down</h3>
            </div>
        </div>
    );
};

export default NotFoundQuery;
