// Core
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

// App
import { ComponentProps, DisplayEnum, FilmResponseType, Mode } from '../../utils/types';
import { NotFoundQuery } from '../Exception';

// Internal
import Card from './Card';
import Button from '../Button';
import { cn } from '../../utils/utils';
import Carousel from '../Carousel';
import { getFilms, getFilmSimilar } from '../../service/film';

// Contanst
const DEFAULT_PAGE = 1;
const MAXIMUM_CARD = 12;

// Type
interface CardSliderProps extends ComponentProps {
    title: string;
    displayType: DisplayEnum;
    mode: Mode;
    similarId?: string;
}

// Component
export const CardSlider: FC<CardSliderProps> = ({ title, displayType, mode = Mode.movie, similarId, className }) => {
    // Queries
    const getCards = async () => {
        let responseData: Array<FilmResponseType> = [];

        if (displayType === DisplayEnum.Similar) {
            if (similarId) responseData = await getFilmSimilar(similarId, mode);
        } else {
            responseData = await getFilms({ page: DEFAULT_PAGE, type: displayType, mode });
        }

        return responseData.slice(0, MAXIMUM_CARD).map((data) => ({
            id: data.id,
            title: data.title,
            poster: data.poster_path,
            mode: mode,
        }));
    };

    const { data: cards, isError } = useQuery({
        queryKey: ['cards', mode, displayType],
        queryFn: getCards,
        refetchOnWindowFocus: false,
    });

    // Templates
    if (isError) {
        return <NotFoundQuery />;
    }

    if (cards?.length === 0) {
        return null;
    }

    return (
        <div className={cn('mt-8 md:mt-16', className)}>
            <div className="flex justify-between items-center mb-3">
                <span className="text-white font-medium text-lg md:text-2xl">{title}</span>
                {!(displayType === DisplayEnum.Similar) && (
                    <Button text="View more" ghost to={`${mode}?type=${displayType}`} />
                )}
            </div>
            <Carousel
                pagination={{ clickable: true }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 30,
                    },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {(cards || []).map((card) => (
                    <Card key={card.id} mode={card.mode} id={card.id} title={card.title} poster={card.poster} />
                ))}
            </Carousel>
        </div>
    );
};

export default CardSlider;
