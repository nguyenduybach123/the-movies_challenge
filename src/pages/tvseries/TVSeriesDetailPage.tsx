import { TVSeriesInfo } from './components/Detail/TVSeriesInfo'
import { TVSeriesIntroduce } from './components/Detail/TVSeriesIntroduce'
import React from 'react'
import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'

export const TVSeriesDetailPage = () => {
  React.useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <DefaultLayout>
      <TVSeriesInfo />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <TVSeriesIntroduce />
      </div>
    </DefaultLayout>
  )
}
