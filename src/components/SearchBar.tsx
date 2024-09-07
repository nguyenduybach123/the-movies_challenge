import React from 'react'
import { Button } from './Button'

export const SearchBar = () => {
  return (
    <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit">
        <input className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
               placeholder="Enter keyword"
        />
        <Button text='Search' type='primary' />
    </form>
  )
}
