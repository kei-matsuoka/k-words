import { useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { patchActivation } from '../../apis/activation';
import { flash_blue, flash_red } from '../../constants';

export const Valid = ({handleFlashMessage}) => {
  const { isSignedIn, setIsSignedIn, setCurrentUser, setLogoutMessage } = useContext(AuthContext);
  const { id, email } = useParams();
  const handleSubmit = async () => {
    try {
      const res = await patchActivation(id, email);
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        setLogoutMessage({ color: flash_blue, message: res.message });
      } else {
        handleFlashMessage(flash_red, res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isSignedIn ? <Navigate to='/' />
        :
        <p>アカウント認証</p>
      }
    </>
  );
}
