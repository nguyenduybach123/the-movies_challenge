// App
import { notQueryImage } from '../../assets';
import Button from '../Button';

// Component
export const ServerErrorPartial500 = () => {
    // Template
    return (
        <div className="w-full min-h-[500px] flex justify-center items-center bg-transparent">
            <div className="flex flex-col justify-center items-center text-white text-center">
                <h1 className="my-8 text-2xl font-bold tracking-wide">Has Some Error :(( </h1>
                <h1 className="text-4xl text-center [text-shadow:_0_4px_8px_#ff0000] font-bold">500</h1>
                <img src={notQueryImage} alt="error" width={200} height={200} />
                <Button className="mt-8" type="primary" to="/" text="Refresh" />
            </div>
        </div>
    );
};

export default ServerErrorPartial500;
