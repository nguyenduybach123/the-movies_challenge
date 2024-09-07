import React from 'react'
import { SearchBar } from '../../components/SearchBar'

export const TVSeriesPage = () => {
  return (
    <div>
      <div className="relative h-48 bg-[url(&quot;src/assets/footer-bg.jpg&quot;)] bg-cover bg-center bg-no-repeat after:content-[&quot;&quot;] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-transparent">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Tv Series</span>
      </div>
      <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
        <SearchBar />
      </div>
    </div>
  )
}
