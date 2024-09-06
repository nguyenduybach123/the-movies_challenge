import React from "react"

export type ButtonType = {
    text?: string,
    size?: 'sm' | 'md' | 'lg',
    ghost?: boolean,
    to?: string,
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default',
    className?: string
}