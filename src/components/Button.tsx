import React from 'react'
import { Link } from 'react-router-dom';
import { ButtonType } from '../utils/constants'
import cn from 'classnames';


export const Button = ({ 
    text, 
    size = 'md' , 
    type = 'default',
    icon,
    ghost = false, 
    to,
    disabled,
    onClick,
    className
}: ButtonType) => {
    let Comp: React.ElementType = 'button';

    if (to) {
        Comp = Link;
    }

    return (
        <Comp className={cn("flex justify-center items-center","rounded-full","transition-all duration-300","ease-in-out",{ 
                            "lg px-5 py-2": size === 'lg', 
                            "md px-4 py-1": size === 'md', 
                            "sm px-3 py-1": size === 'sm', 
                            "btn-ghost": ghost, 
                            "btn-primary": type === 'primary'}, 
                            className)} 
              onClick={onClick}
              disabled={disabled}
        >
            {icon}
            {text}
        </Comp>
    );
}
