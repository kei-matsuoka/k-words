import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { Logout } from '../../apis/logout';

export const Dropdown = () => {
  const { setLoading, setIsSignedIn, isSignedIn, currentUser } = useContext(AuthContext);
  const [state, setState] = useState({ isOpen: false });

  const handleClick = () => {
    state.isOpen ? setState({ isOpen: false }) : setState({ isOpen: true })
  }

  const handleLogout = async () => {
    try {
      const res = await Logout();
      if (res?.data.logged_in === false) {
        setIsSignedIn(false);
      } else {
        console.log('Can not logout');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      { !isSignedIn ? <Navigate to='/' /> : null }
      <button onClick={handleClick} className='hover:bg-gray-100 text-color text-sm p-3 w-32 relative'>
        {currentUser.name}
      </button>
      {state.isOpen ?
        <div className='text-xs bg-white rounded absolute drop-shadow top-12 right-0'>
          <Link to="/dashboard"><div className='p-4 hover:bg-gray-100'>ダッシュボード</div></Link>
          <Link to="#"><div className='p-4 hover:bg-gray-100'>アカウント設定</div></Link>
          <Link to="#"><div className='p-4 hover:bg-gray-100' onClick={handleLogout}>ログアウト</div></Link>
        </div>
      : null}
    </div>
  );
}
