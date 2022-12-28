import { MdOutlineModeComment } from 'react-icons/md';

export const CommentButton = ({handleClickWord}) => {
  return (
    <button onClick={handleClickWord} className="mt-[1px]" >
      <MdOutlineModeComment size="14" className="text-gray-500 hover:scale-110 duration-300" />
    </button>
  )
}
