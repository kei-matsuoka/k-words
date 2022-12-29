import { MdOutlineModeComment } from 'react-icons/md';

export const CommentButton = ({handleClickComment}) => {
  return (
    <button onClick={handleClickComment} className="mt-[1px]" >
      <MdOutlineModeComment size="14" className="text-gray-500 hover:scale-110 duration-300" />
    </button>
  )
}
