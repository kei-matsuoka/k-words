import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { MdHome, MdPerson, MdArticle, MdSettings, MdViewHeadline } from 'react-icons/md';
import { SideBarLink } from '../parts/SideBarLink';

export const SideBar = ({ handleClickSideBar, handleFlashMessage, handleClickLogin }) => {
  const { isSignedIn } = useContext(AuthContext);
  const handleLoginWithMessage = () => {
    handleClickLogin();
    handleFlashMessage("green", "ログインしてください");
  };
  return (
    <div className='flex flex-col text-center bg-white w-[76px] h-full fixed top-0 left-0 z-20'>
      <button onClick={handleClickSideBar} className="pt-3.5 pb-4">
        <MdViewHeadline size={28} className="mx-auto" />
      </button>
      <SideBarLink handleClick={handleClickSideBar} url="/" title="ホーム"><MdHome size={24} /></SideBarLink>
      { isSignedIn ?
      <>
        <SideBarLink handleClick={handleClickSideBar} url="/dashboard" title="単語カード"><MdArticle size={24} /></SideBarLink>
        <SideBarLink handleClick={handleClickSideBar} url="/mypage" title="マイページ"><MdPerson size={24} /></SideBarLink>
        <SideBarLink handleClick={handleClickSideBar} url="/settings" title="設定"><MdSettings size={24} /></SideBarLink>
      </>
      :
      <>
        <SideBarLink handleClick={handleLoginWithMessage} url="#" title="単語カード"><MdArticle size={24} /></SideBarLink>
        <SideBarLink handleClick={handleLoginWithMessage} url="#" title="マイページ"><MdPerson size={24} /></SideBarLink>
        <SideBarLink handleClick={handleLoginWithMessage} url="#" title="設定"><MdSettings size={24} /></SideBarLink>
      </>
      }
    </div>
  );
}
