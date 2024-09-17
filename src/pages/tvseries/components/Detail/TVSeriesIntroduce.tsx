import { DisplayDataType, VideoIntroduceType } from '../../../../utils/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TVSeriesIntroduce = ({ data: tvIntroduces, isFetching }: DisplayDataType<Array<VideoIntroduceType>>) => {
  
    return (
      <div className="py-2 px-4 md:px-8 lg:px-16">
        {
          tvIntroduces?.map(tvIntroduce => (
            <div className="mb-12" key={tvIntroduce.key}>
              <h3 className="text-white text-base md:text-2xl font-semibold mb-4">{tvIntroduce.name}</h3>
              <iframe src={`https://www.youtube.com/embed/${tvIntroduce.key}`} title="video" width="100%" height="800px" loading="lazy" allowFullScreen></iframe>
            </div>
          ))
        }
      </div>
    )
}
