import { MdHome, MdPerson, MdArticle, MdSettings, MdViewHeadline } from 'react-icons/md';
import { SideBarLink } from '../parts/SideBarLink';

export const SideBar = ({ handleClickSideBar }) => {
  return (
    <div className='flex flex-col text-center bg-white w-[76px] h-full fixed top-0 left-0 z-20'>
      <button onClick={handleClickSideBar} className="pt-4 pb-4">
        <MdViewHeadline size={28} className="mx-auto" />
      </button>
      <SideBarLink onClick={handleClickSideBar} url="/" title="ホーム"><MdHome size={24} /></SideBarLink>
      <SideBarLink onClick={handleClickSideBar} url="/dashboard" title="単語カード"><MdArticle size={24} /></SideBarLink>
      <SideBarLink onClick={handleClickSideBar} url="/mypage" title="マイページ"><MdPerson size={24} /></SideBarLink>
      <SideBarLink onClick={handleClickSideBar} url="/settings" title="設定"><MdSettings size={24} /></SideBarLink>
    </div>
  );
}
