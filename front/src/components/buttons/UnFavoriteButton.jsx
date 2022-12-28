import { MdFavorite } from 'react-icons/md';

export const UnFavoriteButton = ({ handleOnFavorite }) => {

  return (
    <button onClick={handleOnFavorite} className="mt-[1px]" >
      <MdFavorite size="15" className="text-red-500 hover:scale-110 duration-300" />
    </button>
  )
}
