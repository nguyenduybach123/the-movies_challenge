import React from 'react'
import { Link } from 'react-router-dom';
import { ButtonType } from '../../utils/constants'
import styles from './Button.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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

    const buttonClasses = cx(
        "btn-lg",
        "btn-default",
        "rounded-full",
        "px-4",
        "py-1",
        { "bg-transparent border-white border-2": ghost, "btn-primary": type === 'primary' },
        className // Thêm className được truyền vào từ props
    );

    return (
        <Comp className={buttonClasses}>{text}</Comp>
    );
}
