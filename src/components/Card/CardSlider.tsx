// Core
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// App 
import {CardSliderType, DisplayEnum, MovieResponseType, TVSeriesResponseType} from "../../utils/types";
import { getMovies, getMovieSimilar } from "../../service/movie";
import { getTVSeries, getTVSeriesSimilar } from "../../service/tvSeries";

// Internal
import Card from "./Card";
import Button from "../Button";

// Contanst
const DEFAULT_PAGE = 1;
const MAXIMUM_CARD = 12;
const MAXIMUM_CARD_VIEW = 6;


// Component
export const CardSlider :FC<CardSliderType> = ({ title, displayType, mode="movie", similarId }) => {

    // Queries
    const getCards = async () => {
        if(mode === "movie") {
            let responseData: Array<MovieResponseType> = [];

            if (displayType === DisplayEnum.Similar) {
                if(similarId)
                    responseData = await getMovieSimilar(similarId);
            }
            else {
                responseData = await getMovies(DEFAULT_PAGE, displayType);
            }

            return responseData.slice(0, MAXIMUM_CARD_VIEW)
                               .map(
                                    data => ({
                                        id: data.id,
                                        title: data.title,
                                        poster: data.poster_path,
                                        mode: mode
                                    })
                               );
        }
        else {
            let responseData: Array<TVSeriesResponseType> = [];

            if (displayType === DisplayEnum.Similar) {
                if(similarId)
                    responseData = await getTVSeriesSimilar(similarId);
            }
            else {
                responseData = await getTVSeries(DEFAULT_PAGE, displayType);
            }

            return responseData.slice(0, MAXIMUM_CARD)
                               .map(
                                    data => ({
                                        id: data.id,
                                        title: data.name,
                                        poster: data.poster_path,
                                        mode: mode
                                    })
                               );
        }
    }

    const { data: cards, isPending, isError, error } = useQuery({
        queryKey: ['cards', mode,displayType],
        queryFn: getCards
    })

    // Templates
    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if(cards?.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 md:mt-16">
            <div className="flex justify-between items-center mb-3">
                <span className="text-white font-medium text-lg md:text-2xl">{title}</span>
                { !(displayType === DisplayEnum.Similar) && <Button text='View more' ghost to={`${mode}?type=${displayType}`} />}
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={MAXIMUM_CARD_VIEW}
              pagination={{
                clickable: true,
              }}

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
              modules={[Autoplay,Pagination,Navigation]}
            >
            {
                cards &&
                cards.map((card) => (
                    <SwiperSlide key={card.id}>
                        <Card mode={card.mode} id={card.id} title={card.title} poster={card.poster} isFetching={isPending} />
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    );
}

export default CardSlider;