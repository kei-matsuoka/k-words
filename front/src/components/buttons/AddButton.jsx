import { MdAddBox } from 'react-icons/md';

export const AddButton = ({handleClick}) => {
  return (
    <button onClick={handleClick} >
      <MdAddBox size="24" className="text-gray-600 hover:text-gray-800 duration-300" />
    </button>
  )
}
