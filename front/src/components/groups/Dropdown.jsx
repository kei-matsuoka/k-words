import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { motion, AnimatePresence } from 'framer-motion'
import { Logout } from '../../apis/logout';

export const Dropdown = ({ handleClickDropdown, handleFlashMessage, handleClickLogin, handleClickSignup, isOpen }) => {
  const { setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, setLogoutMessage } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await Logout();
      if (res?.status === 200) {
        setIsSignedIn(false);
        setCurrentUser(null);
        setLogoutMessage({ color: "rgb(48, 200, 214)", message: res.message });
        handleClickDropdown();
      } else {
        handleFlashMessage("red", res.message);
      }
    } catch (e) {
      console.error(e.message);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  const handleLoginWithDrodown = () => {
    handleClickDropdown();
    handleClickLogin();
  };

  const handleSignupWithDrodown = () => {
    handleClickDropdown();
    handleClickSignup();
  };

  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div
          className="fixed top-0 z-20 left-0 w-full h-full"
          onClick={handleClickDropdown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className='text-xs bg-white rounded absolute drop-shadow top-12 right-0 z-20'>
              {isSignedIn ?
                <>
                  <div className='px-4 py-3 z-30 border-b'>{currentUser.name}</div>
                  <Link to="/mypage" onClick={handleClickDropdown}><div className='p-4 hover:bg-gray-100 z-30 duration-200'>マイページ</div></Link>
                  <Link to="/settings" onClick={handleClickDropdown}><div className='p-4 hover:bg-gray-100 duration-200'>アカウント設定</div></Link>
                  <Link to="#" onClick={handleClickDropdown}><div className='p-4 hover:bg-gray-100 duration-200 rounded-b' onClick={handleLogout}>ログアウト</div></Link>
                </>
                :
                <>
                  <div className='px-4 py-2.5 z-30 border-b'>ゲスト</div>
                  <Link to="#" onClick={handleLoginWithDrodown}><div className='py-4 pl-4 pr-8 hover:bg-gray-100 duration-200'>ログイン</div></Link>
                  <Link to="#" onClick={handleSignupWithDrodown}><div className='py-4 pl-4 pr-8 hover:bg-gray-100 duration-200 rounded-b'>新規登録</div></Link>
                </>
              }
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
