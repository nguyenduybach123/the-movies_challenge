import React from 'react'
import { SearchBar } from '../../components/SearchBar'
import { MovieList } from '../../components/MovieList'
import { Header } from '../../components/Header'

export const MoviesPage = () => {
  return (
    <div>
      <Header />
      <div className="relative h-48 bg-[url(&quot;src/assets/footer-bg.jpg&quot;)] bg-cover bg-center bg-no-repeat after:content-[&quot;&quot;] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-gradient-to-t after:from-black-main after:to-transparent">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Movies</span>
      </div>
      <div className="bg-black-main px-8 py-4 md:px-16 md:py-8">
        <SearchBar />
        <MovieList />
      </div>
    </div>
  )
}
