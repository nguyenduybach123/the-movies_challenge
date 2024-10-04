// Core
import { FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// App
import { ButtonType } from "../utils/types"
import { BaseSpinner } from "./Spinner";

// Component
export const Button :FC<ButtonType> = ({ 
    text, 
    size = 'md' , 
    type = 'default',
    icon,
    ghost = false,
    loading = false, 
    to,
    onClick,
    className
}) => {

    // Templates
    if (to) {
        return (
            <Link className={cn("flex justify-center items-center","rounded-full","transition-all duration-300","ease-in-out",{ 
                                "lg px-5 py-2": size === 'lg', 
                                "md px-4 py-1": size === 'md', 
                                "sm px-3 py-1": size === 'sm', 
                                "btn-ghost": ghost, 
                                "btn-primary": type === 'primary'}, 
                                className)} 
                  to={to}
            >
                {icon}
                {text}
            </Link>
        );
    }

    return (
        <button className={cn("flex justify-center items-center","rounded-full","transition-all duration-300","ease-in-out",{ 
                            "lg px-5 py-2": size === 'lg', 
                            "md px-4 py-1": size === 'md', 
                            "sm px-3 py-1": size === 'sm', 
                            "btn-ghost": ghost, 
                            "btn-primary": type === 'primary'}, 
                            className)} 
              onClick={onClick}
              disabled={loading}
        >
            {
                (loading) ?
                    <BaseSpinner color='#FF0000' width={20} height={20} className="mr-2" />
                :
                    icon 
            }
            {
                (loading) ?
                    "Loading . . ."
                :
                    text
            }
        </button>
    );
}

export default Button;