import React from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

export const Header = () => {
  return (
    <div className='hidden md:flex md:p-4 lg:p-8 w-full justify-between items-center text-white'>
        <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
          <img src="./assets/tmovie-55621206.png" alt="Logo" className="mr-4 w-8 md:w-12" />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">theMovies</h1>
        </a>
        <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly md:bg-transparent py-2 md:py-4 -mx-4">
          <div className="px-4">
            <a className={cx("nav-item","after:w-full")} href="/">Home</a>
          </div>
          <div className="px-4">
            <a className={cx("nav-item")} href="/movie">Movies</a>
          </div>
          <div className="x-4">
            <a className={cx("nav-item")} href="/tv">TV Series</a>
          </div>
        </div>
    </div>
  )
}
