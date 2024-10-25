// App
import Button from '../Button';
import { ReloadIcon } from '../Icon';

// Component
export const ServerErrorPartial500 = () => {
    // Template
    return (
        <div className="w-full min-h-[300px] flex justify-center items-center bg-transparent">
            <div className="flex flex-col justify-center items-center text-white text-center">
                <h1 className="text-2xl text-center [text-shadow:_0_4px_8px_#ff0000] font-bold">Not Found Data</h1>
                <Button
                    className="mt-8"
                    type="primary"
                    to="/"
                    text="Refresh"
                    icon={<ReloadIcon className="mr-2" width={'20px'} height={'20px'} />}
                />
            </div>
        </div>
    );
};

export default ServerErrorPartial500;
