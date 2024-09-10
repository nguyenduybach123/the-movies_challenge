import React from 'react'
import { Button } from './Button'
import { useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState("");
  console.log(_searchParams);

  const handleSearchMovie = () => {
    if(searchValue === "")
      return;
    setSearchParams({keyword: searchValue});
  }

  return (
    <div className=" flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit">
        <input className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
               placeholder="Enter keyword"
               onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
        />
        <Button text='Search' type='primary' onClick={handleSearchMovie} />
    </div>
  )
}
