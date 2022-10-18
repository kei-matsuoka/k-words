import { MdEdit } from 'react-icons/md';

export const PatchButton = ({handleOnClickPatch}) => {
  return (
    <button onClick={handleOnClickPatch}>
      <MdEdit className='text-gray-500 hover:text-gray-800 duration-300' />
    </button>
  )
}
