import React, { FC } from 'react';
import { Swiper, SwiperSlideProps } from 'swiper/react';
import { AutoplayOptions, CoverflowEffectOptions, SwiperOptions } from 'swiper/types';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// App
import { cn } from '../utils/utils';
import { ComponentProps } from '../utils/types';

interface CarouselProps extends ComponentProps {
    breakpoints?: {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
    };
    autoplay?: boolean | AutoplayOptions | undefined;
    effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards';
    coverflowEffect?: CoverflowEffectOptions | undefined;
    centeredSlides?: boolean;
    clickable?: boolean;
    children: React.ReactElement<SwiperSlideProps> | React.ReactElement<SwiperSlideProps>[];
}

// Component
const Carousel: FC<CarouselProps> = ({
    breakpoints,
    autoplay,
    effect,
    coverflowEffect,
    centeredSlides,
    clickable = false,
    className,
    children,
}) => {
    // Template
    return (
        <Swiper
            className={cn(className, 'flex justify-center items-center')}
            pagination={{
                clickable: clickable,
            }}
            autoplay={autoplay}
            breakpoints={breakpoints}
            effect={effect}
            coverflowEffect={coverflowEffect}
            centeredSlides={centeredSlides}
            modules={[
                ...(coverflowEffect ? [EffectCoverflow] : []),
                ...(autoplay ? [Autoplay] : []),
                Navigation,
                Pagination,
            ]}
        >
            {Array.isArray(children)
                ? children.map((slide) => React.cloneElement(slide))
                : React.cloneElement(children)}
        </Swiper>
    );
};

export default Carousel;
