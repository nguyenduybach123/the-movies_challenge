import React from 'react'
import { Button } from './Button'
import { PlayIcon } from './Icon'
import { MovieCardType } from '../utils/constants'

export const MovieCard = ({ title, poster }: MovieCardType) => {
  return (
    <a href='/'>
        <div className="relative w-full h-72 flex justify-center items-center rounded-2xl group after:absolute after:top-0 after:left-0 after:content-[''] after:w-full after:h-full after:duration-300 after:ease-in-out after:rounded-2xl hover:after:bg-black/60 bg-cover bg-center bg-no-repeat"
             style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${ poster })`}}
        >
            <Button className="hidden group-hover:block z-10" type='primary' size='lg' icon={<PlayIcon width={"16px"} height={"16px"} />} />
        </div>
        <h3 className="font-medium text-white text-sm md:text-lg mt-4 transition duration-300 ease-in-out group-hover/container:text-red-main">{ title }</h3>
    </a>
  )
}
