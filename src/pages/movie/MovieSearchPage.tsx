import React from 'react'
import { useLocation } from 'react-router-dom'

export const MovieSearchPage = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const keyword = searchParams.get('keyword');

    return (
        <div className="text-white">MovieSearchPage {keyword}</div>
    )
}
