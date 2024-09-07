import React from 'react'
import { Link } from 'react-router-dom';
import { ButtonType } from '../utils/constants'
import cn from 'classnames';


export const Button = ({ 
    text, 
    size = 'md' , 
    type = 'default',
    ghost = false, 
    to,
    className
}: ButtonType) => {
    let Comp: React.ElementType = 'button';

    if (to) {
        Comp = Link;
    }

    return (
        <Comp className={cn("rounded-full",{ "lg px-5 py-2": size === 'lg', "md px-4 py-1": size === 'md', "sm px-3 py-1": size === 'sm', "bg-transparent border-white border-2": ghost, "btn-primary": type === 'primary' }, className)}>{text}</Comp>
    );
}
