import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom';

import image from '../../../assets/tmovie-55621206.png'
import { useHeaderContext } from './context/HeaderContext';

export const Header = () => {
  const { menuItems, setMenuItems } = useHeaderContext();

  React.useEffect(() => {
    function handleScroll() {
      const header = document.getElementById('header');

      if (header === null) {
        return;
      }

      if (window.scrollY > 100) {
        header.classList.remove('bg-transparent');
        header.classList.add('bg-black-main');
      } else {
        header.classList.remove('bg-black-main');
        header.classList.add('bg-transparent');
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id='header' className="px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out py-0 md:py-8 bg-transparent">
        <div className="max-w-screen-2xl flex justify-between items-center w-full bg">
          <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
            <img src={image} alt="Logo" className="mr-4 w-8 md:w-12 animate-bounce" />
            <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">theMovies</h1>
          </a>
          <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black-main md:bg-transparent py-2 md:py-4 -mx-4">
            {
              menuItems.map((menuItem, idx) => (
                <div className="px-4" key={menuItem.id}>
                  <Link className={cn("nav-item",{"after:w-full": menuItem.isActive})} to={menuItem.href} 
                     onClick={() => setMenuItems(prevButtons => (
                        prevButtons.map((button) => button.id === idx ? { ...button, isActive: true } : { ...button, isActive: false })
                     ))} 
                  >
                    {menuItem.title}
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  );
}