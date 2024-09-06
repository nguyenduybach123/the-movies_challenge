import React from 'react'
import { Banner } from '../Banner'
import cn from 'classnames';

const banners = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
];

export const Slider = () => {

  const [current, setCurrent] = React.useState(0);


  return (
    <div className="overflow-hidden">
      <div className="w-max h-full flex transition-all ease-in-out duration-1000"
           style={{transform: `translateX(-${current * 1536}px)`}}
      >
        <Banner />
        <Banner />
        <Banner />
      </div>
      <div className='absolute m-auto left-1/2 bottom-8 flex gap-4'>
      {
        banners.map((banner, index) => (
            <div key={banner.id} className={cn('w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center',{'scale-150': current === index})} onClick={() => setCurrent(index)}>
                {
                    current === index &&
                        <div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
                }
            </div>
        ))
      }
        </div>
    </div>
  )
}
