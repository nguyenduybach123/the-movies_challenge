// Core
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// App
import { Button } from '../../../../components/Button';
import { ComponentProps } from '../../../../utils/types';

// Type
export interface BannerProps extends ComponentProps {
    id: number;
    name: string;
    overview: string;
    poster: string;
    backdrop: string;
    onActiveTrailer?: () => void;
}

// Constant
const variantOpacityBanner = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.3,
        },
    },
};

const variantScaleBanner = {
    initial: {
        scaleX: 0,
        scaleY: 0,
    },
    animate: {
        scaleX: 1,
        scaleY: 1,
        transition: {
            duration: 1,
        },
    },
};

// Component
export const Banner: FC<BannerProps> = ({ id, name, overview, poster, backdrop, onActiveTrailer = () => {} }) => {
    // State
    const navigate = useNavigate();

    // Functions
    // * handle navigate to detail movie
    const handleWatchNow = () => {
        navigate(`/movie/${id}`);
    };

    // * handle open modal trailer movie
    const handleWatchTrailer = () => {
        onActiveTrailer();
    };

    // Template
    return (
        <div
            className='relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:px-12 py-12 md:py-32 flex justify-center bg-center bg-no-repeat bg-cover before:content-[""] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent cursor-grab'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop})` }}
        >
            <div className="max-w-screen-2xl z-10 h-fit flex items-center justify-between">
                <motion.div
                    className="w-full lg:w-2/3 px-4"
                    variants={variantOpacityBanner}
                    initial="initial"
                    whileInView="animate"
                >
                    <motion.h2
                        className="font-bold text-4xl md:text-6xl lg:text-8xl delay-300 text-white transition duration-700 ease-in-out opacity-100 translate-y-0"
                        variants={variantOpacityBanner}
                    >
                        {name}
                    </motion.h2>
                    <motion.p
                        className="font-medium text-white text-xs md:text-xl my-12 delay-[600ms] transition duration-700 ease-in-out opacity-100 translate-y-0"
                        variants={variantOpacityBanner}
                    >
                        {overview}
                    </motion.p>
                    <motion.div
                        className="flex delay-[900ms] text-white transition duration-700 ease-in-out opacity-100 translate-y-0"
                        variants={variantOpacityBanner}
                    >
                        <Button text="Watch Now" size="lg" type="primary" className="mr-4" onClick={handleWatchNow} />
                        <Button text="Watch trailer" size="lg" ghost onClick={handleWatchTrailer} />
                    </motion.div>
                </motion.div>
                <div className="hidden px-4 lg:block lg:w-1/3">
                    <motion.img
                        className="w-96 rounded-3xl scale-animate"
                        src={`https://image.tmdb.org/t/p/w500/${poster}`}
                        alt="Poster"
                        variants={variantScaleBanner}
                        initial="initial"
                        whileInView="animate"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
