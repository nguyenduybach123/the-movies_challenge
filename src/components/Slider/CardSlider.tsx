import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Card } from '../Card';
import { Button } from '../Button';
import { httpRequest } from '../../utils/httpRequest';
import { MovieCardType, DisplayEnum, MovieResponseType } from '../../utils/types';

const MAXIMUM_CARD = 12;
const MAXIMUM_CARD_VIEW = 6;

export const CardSlider = ({ title, displayType, mode="movie", similarId }:{ title: string, displayType: DisplayEnum, mode: 'movie' | 'tv', similarId?: string }) => {

    // HTTP GET MOVIE CARD
    const getCards = async () => {
        let requestURL = "";
        requestURL = `${mode}/${displayType}?api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
  
        if (displayType === DisplayEnum.Similar) {
            if(!similarId)
                return;
            requestURL = `${mode}/${similarId}/similar?api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
        }
        else if(displayType !== DisplayEnum.Popular && displayType !== DisplayEnum.TopRated){
            return [];
        }

        const response = await httpRequest.get(requestURL);
        const movies:Array<MovieResponseType> = response.data?.results ;

        if(!movies)
            return;

        const cardMovies:Array<MovieCardType> = movies.slice(0, MAXIMUM_CARD).map(
            (movie) => ({
                id: movie.id,
                title: mode === "movie" ? movie.title : movie.name,
                poster: movie.poster_path,
                mode: mode
            })
        )

        return cardMovies;
    }

    const { data: cards, isPending, isError, error } = useQuery({
        queryKey: ['cards',mode,displayType],
        queryFn: getCards
    })

    
    if (isError) {
        return <span>Error: {error.message}</span>
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