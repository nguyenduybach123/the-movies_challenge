import { DisplayDataType, VideoIntroduceType } from '../../../../utils/types';

export const MovieIntroduce = ({ data, isFetching }: DisplayDataType<Array<VideoIntroduceType>>) => {

  if(isFetching)
    return (<p>Loading . . .</p>);

  return (
    <div className="py-2 px-4 md:px-8 lg:px-16">
      {
        data?.map(movieIntroduce => (
          <div className="mb-12" key={movieIntroduce.key}>
            <h3 className="text-white text-base md:text-2xl font-semibold mb-4">{movieIntroduce.name}</h3>
            <iframe src={`https://www.youtube.com/embed/${movieIntroduce.key}`} title="video" width="100%" height="800px" loading="lazy" allowFullScreen></iframe>
          </div>
        ))
      }
    </div>
  )
}
