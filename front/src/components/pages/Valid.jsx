import { useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { patchActivation } from '../../apis/activation';

export const Valid = () => {
  const { isSignedIn, setIsSignedIn, setCurrentUser, setLogoutMessage } = useContext(AuthContext);
  const { id, email } = useParams();
  const handleSubmit = async () => {
    try {
      const res = await patchActivation(id, email);
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        setLogoutMessage({ color: "rgb(48, 200, 214)", message: "アカウントを認証しました" });
      } else {
        setLogoutMessage({ color: "red", message: "アカウントの認証に失敗しました" });
      }
    } catch (e) {
      console.error(e);
      setLogoutMessage({ color: "red", message: e.message });
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser]);

  return (
    <>
      {isSignedIn ? <Navigate to='/' />
        :
        <p>アカウント認証</p>
      }
    </>
  );
}
