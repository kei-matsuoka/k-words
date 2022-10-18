import { MdViewHeadline } from 'react-icons/md';

export const SideBarButton = ({handleClickSideBar}) => {
  return (
    <button onClick={handleClickSideBar}>
      <MdViewHeadline size={28} />
    </button>
  )
}
