import { MdViewHeadline } from 'react-icons/md';

export const SideBarButton = ({handleClickSideBar}) => {
  return (
    <button onClick={handleClickSideBar} className="text-gray-800 hover:text-gray-600 duration-300">
      <MdViewHeadline size={28} />
    </button>
  )
}
