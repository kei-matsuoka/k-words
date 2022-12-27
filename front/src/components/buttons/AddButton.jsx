import { MdAddBox } from 'react-icons/md';

export const AddButton = ({handleClickWord}) => {
  return (
    <button onClick={handleClickWord} >
      <MdAddBox size="24" className="text-gray-800 hover:text-gray-600 duration-300" />
    </button>
  )
}
