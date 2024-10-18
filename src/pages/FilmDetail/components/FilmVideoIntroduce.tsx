import { FC } from 'react';
import { VideoIntroduceType } from '../../../utils/types';

interface FilmVideoIntroduceProps {
    introduces: Array<VideoIntroduceType>;
}

export const FilmVideoIntroduce: FC<FilmVideoIntroduceProps> = ({ introduces }) => {
    return (
        <div className="py-2 px-4 md:px-8 lg:px-16">
            {introduces?.map((movieIntroduce) => (
                <div className="mb-12" key={movieIntroduce.key}>
                    <h3 className="text-white text-base md:text-2xl font-semibold mb-4">{movieIntroduce.name}</h3>
                    <iframe
                        src={`https://www.youtube.com/embed/${movieIntroduce.key}`}
                        title="video"
                        width="100%"
                        height="800px"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default FilmVideoIntroduce;
