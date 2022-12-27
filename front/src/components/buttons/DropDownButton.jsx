import { FaUserCircle } from 'react-icons/fa';

export const DropdownButton = ({handleClickDropdown}) => {
  return (
    <button onClick={handleClickDropdown}  className="ml-4">
      <FaUserCircle size="24" className="text-gray-800 hover:text-gray-600 duration-300" />
    </button>
  )
}
