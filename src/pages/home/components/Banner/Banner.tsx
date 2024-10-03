import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

import { Button } from '../../../../components/Button'
import { BannerType } from '../../../../utils/types'
import { useHomeContext } from '../../context/HomeContext'

const variantBanner = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
}

export const Banner = ({ id, name, overview, poster, backdrop }: BannerType) => {
  const { setIsOpenDialogTrailer, setIdBannerSelected } = useHomeContext();
  const navigate = useNavigate();

  const handleWatchNow = () => {
    navigate(`/movie/${id}`);
  }

  const handleWatchTrailer = () => {
    setIdBannerSelected(id);
    setIsOpenDialogTrailer(true);
  }

  return (
    <div className="relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:px-12 py-12 md:py-32 flex justify-center bg-center bg-no-repeat bg-cover before:content-[&quot;&quot;] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:content-[&quot;&quot;] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent cursor-grab" 
         style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${ backdrop })`}}
    >
        <div className="max-w-screen-2xl z-10 h-fit flex items-center justify-between">
          <motion.div className='w-full lg:w-2/3 px-4' variants={variantBanner} initial="initial" whileInView="animate">
              <motion.h2 className="font-bold text-4xl md:text-6xl lg:text-8xl delay-300 text-white transition duration-700 ease-in-out opacity-100 translate-y-0" variants={variantBanner}>{ name }</motion.h2>
              <motion.p className="font-medium text-white text-xs md:text-xl my-12 delay-[600ms] transition duration-700 ease-in-out opacity-100 translate-y-0" variants={variantBanner}>{ overview }</motion.p>
              <motion.div className="flex delay-[900ms] text-white transition duration-700 ease-in-out opacity-100 translate-y-0" variants={variantBanner}>
                  <Button text='Watch Now' size='lg' type='primary' className='mr-4' onClick={handleWatchNow} />
                  <Button text='Watch trailer' size='lg' ghost onClick={handleWatchTrailer} />
              </motion.div>
          </motion.div>
          <div className='hidden px-4 lg:block lg:w-1/3'>
            <img className="w-96 rounded-3xl scale-animate" src={`https://image.tmdb.org/t/p/w500/${ poster }`} alt="Poster" />
          </div>
        </div>
    </div>
  );
}

export default Banner;