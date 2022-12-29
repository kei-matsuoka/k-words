import { MdModeComment } from 'react-icons/md';

export const CommentedButton = ({handleClickComment}) => {
  return (
    <button onClick={handleClickComment} className="mt-[1px]" >
      <MdModeComment size="14" className="text-gray-800 hover:scale-110 duration-300" />
    </button>
  )
}
