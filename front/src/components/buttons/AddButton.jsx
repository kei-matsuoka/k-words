import { VscDiffAdded } from 'react-icons/vsc';

export const AddButton = ({handleClickWord}) => {
  return (
    <button onClick={handleClickWord}>
      <VscDiffAdded size="20" className="text-gray-600 hover:text-gray-800 duration-300 mr-2" />
    </button>
  )
}
