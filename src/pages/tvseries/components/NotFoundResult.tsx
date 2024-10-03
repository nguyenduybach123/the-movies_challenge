//App
import { notResultSearchImage } from "../../../assets";


export const NotFoundResult = ({keyword, isFetching}: {keyword: string, isFetching: boolean}) => {
  
  if(isFetching) {
    return null;
  }
  
  return (
    <div className="h-full text-center font-semibold text-white">
        <h1 className="text-3xl p-4 mb-4">No Results Found For : {keyword}</h1>
        <img src={notResultSearchImage} className="w-50/2 h-36 mx-auto" />
        <p className="">Don't give up</p>
    </div>
  )
}

export default NotFoundResult;