import { IoTrashSharp } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

export const UserWord = ({ word, handleIsOpen, handleDestroyWord }) => {
  return (
    <div className='flex flex-col w-11/12 p-6 m-2 rounded-md border bg-white'>
      <div className='flex justify-end'>
        <button onClick={() => handleIsOpen(word)}><MdEdit className='text-gray-500 hover:text-gray-800 duration-300'/></button>
        <button onClick={() => handleDestroyWord(word.id)}><IoTrashSharp className='text-gray-500 hover:text-gray-800 duration-300 ml-2'/></button>
      </div>
      <div className='mt-3 text-sm'>{word.title}</div>
      <div className='mt-3 text-sm'>{word.meaning}</div>
      <div className='mt-3 text-sm'>{word.text}</div>
    </div>
  );
}
