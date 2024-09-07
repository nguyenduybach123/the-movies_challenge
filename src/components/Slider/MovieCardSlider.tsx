import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MovieCard } from '../MovieCard';
import { Button } from '../Button';
import { MovieCardType, MovieDisplayEnum, MovieResponseType } from '../../utils/constants';
import { httpRequest } from '../../utils/httpRequest';

const MAXIMUM_CARD = 12;
const MAXIMUM_CARD_VIEW = 6;

export const MovieCardSlider = ({ title, displayType, mode="movie" }:{ title: string, displayType: MovieDisplayEnum, mode: 'movie' | 'tv' }) => {
    const [movieCards, setMovieCards] = React.useState<MovieCardType[]>([]);
    
    React.useEffect(() => {
        // HTTP GET MOVIE CARD
        const getMovieCards = async () => {
            let requestURL = "";

            if(displayType === MovieDisplayEnum.Trending) {
                requestURL = `${displayType}/${mode}/day?api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
            }
            else if (displayType === MovieDisplayEnum.TopRated) {
                requestURL = `${mode}/${displayType}?api_key=ae722869d6f14e76aebfb0d1fd961dd7`;
            }
            else {
                return;
            } 

            const response = await httpRequest.get(requestURL);
            const movies:Array<MovieResponseType> = response.data?.results ;

            if(!movies)
                return;

            const cardMovies = movies.slice(0, MAXIMUM_CARD).map(
                (movie) => ({
                    title: mode === "movie" ? movie.title : movie.name,
                    poster: movie.poster_path,
                })
            )

            setMovieCards(cardMovies);
        }

        getMovieCards();

    },[])


    return (
        <div className="mt-8 md:mt-16">
            <div className="flex justify-between items-center mb-3">
                <span className="text-white font-medium text-lg md:text-2xl">{title}</span>
                <Button text='View more' ghost />
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={MAXIMUM_CARD_VIEW}
            >
            {
                movieCards.map((card) => (
                    <SwiperSlide key={card.title}>
                        <MovieCard title={card.title} poster={card.poster} />
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
      );
}
