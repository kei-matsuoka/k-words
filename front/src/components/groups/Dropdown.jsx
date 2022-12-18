import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { Logout } from '../../apis/logout';

export const DropDown = ({ handleClickDropDown }) => {
  const { setLoading, setIsSignedIn, setCurrentUser, flashMessage, setFlashMessage } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await Logout();
      if (res?.logged_in === false) {
        setIsSignedIn(false);
        setCurrentUser(null);
        setFlashMessage({ color: "rgb(48, 200, 214)", message: "ログアウトしました" });
        handleClickDropDown();
      } else {
        setFlashMessage({ color: "red", message: "ログアウトできません。" });
      }
    } catch (e) {
      console.log(e.message);
      setFlashMessage({ color: "red", message: e.message });
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 z-20 left-0 w-full h-full" onClick={handleClickDropDown}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className='text-xs bg-white rounded absolute drop-shadow top-12 right-0 z-20'>
          <Link to="/mypage" onClick={handleClickDropDown}><div className='p-4 hover:bg-gray-100 z-30'>マイページ</div></Link>
          <Link to="/settings" onClick={handleClickDropDown}><div className='p-4 hover:bg-gray-100'>アカウント設定</div></Link>
          <Link to="#" onClick={handleClickDropDown}><div className='p-4 hover:bg-gray-100' onClick={handleLogout}>ログアウト</div></Link>
        </div>
      </div>
    </div>
  );
}
