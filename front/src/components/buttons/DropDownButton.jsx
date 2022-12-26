import { FaUserCircle } from 'react-icons/fa';

export const DropDownButton = ({handleClickDropDown}) => {
  return (
    <button onClick={handleClickDropDown}  className="ml-4">
      <FaUserCircle size="24" className="text-gray-600 hover:text-gray-800 duration-300" />
    </button>
  )
}
