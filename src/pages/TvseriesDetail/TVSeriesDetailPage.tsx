// Core
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// App
import { CardSlider } from '../../components'
import { DisplayEnum } from '../../utils/types'
import { getTVCast, getTVSeriesDetail, getTVSeriesIntroduce } from '../../service/tvSeries'

import { TVSeriesInfo, TVSeriesIntroduce } from './components'

// Component
export const TVSeriesDetailPage = () => {
  // States
  const { id } = useParams();

  // Queries
  const { data: tvDetail, isError: isErrorDetail, error: errorDetail } = useQuery({
    queryKey: ['tvseriesdetail', id],
    queryFn: () => getTVSeriesDetail(id)
  })

  const tvId = tvDetail?.id;

  const {data: casts } = useQuery({
    queryKey: ['tvseriescasts', tvId],
    queryFn: () => getTVCast(tvId),
    enabled: !!tvId
  })
  
  const { data: tvIntroduces, isPending: isTVIntroducePending, isError: isErrorIntroduce, error: errorIntroduce } = useQuery({
    queryKey: ['tvseriesintroduce', tvId],
    queryFn: () => getTVSeriesIntroduce(id)
  })

  // Effects
  // * scroll to top
  useEffect(() => {
    window.scrollTo(0,0);
  },[tvDetail])

  // Templates
  if (isErrorDetail) {
    return <span>Error: {errorDetail.message}</span>
  }

  if (isErrorIntroduce) {
      return <span>Error: {errorIntroduce.message}</span>
  }

  return (
    <>
      <TVSeriesInfo data={tvDetail} casts={casts ? casts : []} />
      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <TVSeriesIntroduce data={tvIntroduces ? tvIntroduces : []} isFetching={isTVIntroducePending} />
        <CardSlider title="Similar" displayType={DisplayEnum.Similar} similarId={id} mode="tv"/>
      </div>
    </>
  );
}
