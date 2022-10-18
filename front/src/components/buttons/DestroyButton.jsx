import { IoTrashSharp } from 'react-icons/io5';

export const DestroyButton = ({handleOnClickDestroy}) => {
  return (
    <button onClick={handleOnClickDestroy}>
      <IoTrashSharp className='text-gray-500 hover:text-gray-800 duration-300' />
    </button>
  )
}
