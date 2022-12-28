import { MdFavoriteBorder } from 'react-icons/md';

export const FavoriteButton = ({ handleOnFavorite }) => {
  return (
    <button onClick={handleOnFavorite} className="mt-[1px]" >
      <MdFavoriteBorder size="15" className="text-gray-500 hover:scale-110 duration-300" />
    </button>
  )
}
