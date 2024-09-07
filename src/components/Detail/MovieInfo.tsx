import React from 'react'

export const MovieInfo = () => {
  return (
    <div className="relative px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20">
      <div className="flex justify-center items-center">
        <div className="hidden md:block px-4">
          <img src="https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg" className="w-full rounded-3xl" />
        </div>
        <div className="px-4">
          <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">Despicable Me 4</h2>
          <ul className="flex items-center p-4">
            <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Animation</li>
            <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Family</li>
            <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Comedy</li>
            <li className="bg-black-main border-2 border-white rounded-full text-sm p-2 mr-2">Action</li>
          </ul>
          <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base">
            Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.
          </p>
          <h3 className="text-white text-xl font-medium py-2">Casts</h3>
          <div className="flex items-center">
            
          </div>
        </div>
      </div>
    </div>
  )
}
