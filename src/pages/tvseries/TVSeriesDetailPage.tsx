import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout'
import { TVSeriesInfo } from './components/Detail/TVSeriesInfo'
import { TVSeriesIntroduce } from './components/Detail/TVSeriesIntroduce'
import { CardSlider } from '../../components/Slider/CardSlider'
import { DisplayEnum } from '../../utils/types'
import { getTVCast, getTVDetail, getTVIntroduces } from '../../service/tvSeries'

export const TVSeriesDetailPage = () => {
  const { id } = useParams();

  const { data: tvDetail, isError: isErrorDetail, error: errorDetail } = useQuery({
    queryKey: ['tvseriesdetail', id],
    queryFn: () => getTVDetail(id)
  })

  const tvId = tvDetail?.id;

  const {data: casts } = useQuery({
    queryKey: ['tvseriescasts', tvId],
    queryFn: () => getTVCast(tvId),
    enabled: !!tvId
  })
  
  const { data: tvIntroduces, isPending: isTVIntroducePending, isError: isErrorIntroduce, error: errorIntroduce } = useQuery({
    queryKey: ['tvseriesintroduce', tvId],
    queryFn: () => getTVIntroduces(id)
  })

  React.useEffect(() => {
    window.scrollTo(0,0);
  },[tvDetail])

  if (isErrorDetail) {
    return <span>Error: {errorDetail.message}</span>
  }

  if (isErrorIntroduce) {
      return <span>Error: {errorIntroduce.message}</span>
  }

  return (
    <DefaultLayout>
      <TVSeriesInfo data={tvDetail} casts={casts ? casts : []} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <TVSeriesIntroduce data={tvIntroduces ? tvIntroduces : []} isFetching={isTVIntroducePending} />
        <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="tv"/>
      </div>
    </DefaultLayout>
  );
}
