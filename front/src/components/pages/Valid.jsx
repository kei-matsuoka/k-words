import { useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { patchActivation } from '../../apis/activation';

export const Valid = () => {
  const { isSignedIn, setIsSignedIn, setCurrentUser, setFlashMessage } = useContext(AuthContext);
  const { id, email } = useParams();
  const handleSubmit = async () => {
    try {
      const res = await patchActivation(id, email);
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        setFlashMessage({ message: "アカウントを認証しました" });
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
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
