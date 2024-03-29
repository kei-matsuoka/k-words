import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { MdHome, MdPerson, MdArticle, MdSettings, MdViewHeadline } from 'react-icons/md';
import { SideBarLink } from '../parts/SideBarLink';
import { flash_red } from '../../constants';

export const SideBar = ({ handleFlashMessage, handleClickLogin, handleClickSideBar }) => {
  const { isSignedIn } = useContext(AuthContext);

  const handleLoginWithMessage = () => {
    handleClickSideBar && handleClickSideBar();
    handleClickLogin();
    handleFlashMessage(flash_red, "この機能はログインが必要です");
  };

  return (
    <div className='flex flex-col text-center bg-white w-[76px] h-full fixed top-0 left-0 z-20'>
      <button onClick={handleClickSideBar} className="pt-3.5 pb-4 button-gray-800">
        <MdViewHeadline size={28} className="mx-auto" />
      </button>

      <SideBarLink handleOnClick={handleClickSideBar} url="/" title="ホーム">
        <MdHome size={24} />
      </SideBarLink>
      <SideBarLink handleOnClick={handleClickSideBar} url="/dashboard" title="単語カード">
        <MdArticle size={24} />
      </SideBarLink>

      {isSignedIn ?
        <>
          <SideBarLink handleOnClick={handleClickSideBar} url="/mypage" title="マイページ">
            <MdPerson size={24} />
          </SideBarLink>
          <SideBarLink handleOnClick={handleClickSideBar} url="/settings" title="設定">
            <MdSettings size={24} />
          </SideBarLink>
        </>
        :
        <>
          <SideBarLink handleOnClick={handleLoginWithMessage} url="#" title="マイページ">
            <MdPerson size={24} />
          </SideBarLink>
          <SideBarLink handleOnClick={handleLoginWithMessage} url="#" title="設定">
            <MdSettings size={24} />
          </SideBarLink>
        </>
      }
    </div>
  );
}
