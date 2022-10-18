import { MdSearch } from 'react-icons/md';

export const SearchButton = ({handleClickSearchInput}) => {
  return (
    <button onClick={handleClickSearchInput}>
      <MdSearch size="20" className="text-gray-600 hover:text-gray-800 duration-300" />
    </button>
  )
}
