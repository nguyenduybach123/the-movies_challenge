import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Button } from './Button'
import { PlayIcon } from './Icon'
import { MovieCardType } from '../utils/types'
import defaultPosterImage from '../assets/default-movie.jpg'

export const Card = ({ id, mode, title, poster, isFetching = false }: MovieCardType & {isFetching: boolean}) => {
  const posterURL = poster ? `https://image.tmdb.org/t/p/w500/${poster}` : defaultPosterImage;

  return (
    <>
      {
        (!isFetching) ? 
          <Link to={`/${mode}/${id}`} className="relative hover:cursor-pointer group/container z-10">
              <div className={cn("relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover group/poster group/container after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:rounded-3xl hover:after:bg-black/60 after:transition after:ease-in-out after:duration-300")}
                  style={{backgroundImage: `url(${ posterURL }`}}
              >
                  <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-8 bg-red-main rounded-full shadow-btn z-10 text-white text-xl scale-50 opacity-0 transition ease-in-out duration-300 group-hover/poster:opacity-100 group-hover/poster:scale-100 hover:shadow-btn-hover" type='primary' size='lg' icon={<PlayIcon width={"16px"} height={"16px"} />} />
              </div>
              <h3 className="font-medium text-white text-sm md:text-lg mt-4 transition duration-300 ease-in-out group-hover/container:text-red-main hover:text-red-main">{ title }</h3>
          </Link>
        :
          <CardSkeleton />
      }
    </>
  );
}

const CardSkeleton = () => {
  return (
    <div role="status" className="flex items-center justify-center w-full h-72 2xl:h-80 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}