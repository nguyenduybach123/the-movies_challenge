import { notFoundPageImage } from '../../assets';
import Button from '../Button';

const NotFoundPage = () => {
    return (
        <div className="relative flex justify-center items-center w-screen-2xl h-screen overflow-hidden">
            <div className="flex flex-col justify-center items-center text-white text-center">
                <img
                    className="absolute left-0 -bottom-0 -rotate-2"
                    src={notFoundPageImage}
                    alt="error"
                    width={400}
                    height={400}
                />
                <h1 className="text-9xl text-center [text-shadow:_0_4px_8px_#ff0000] font-bold">404</h1>
                <h3 className="mt-5 text-2xl font-semibold tracking-normal">Page Not Found</h3>
                <Button className="mt-8" type="primary" to="/" text="Go Home" />
            </div>
        </div>
    );
};

export { NotFoundPage };
