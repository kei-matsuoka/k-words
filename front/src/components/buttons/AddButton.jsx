import { MdOutlineAddBox } from 'react-icons/md';

export const AddButton = ({handleClickWord}) => {
  return (
    <button onClick={handleClickWord}>
      <MdOutlineAddBox size="20" className="text-gray-600 hover:text-gray-800 duration-300 mr-4" />
    </button>
  )
}
