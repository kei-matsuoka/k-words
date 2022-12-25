import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { destroyUser } from '../../apis/users';

export const AccountDestroyOutlet = () => {
  const { setLoading, setCurrentUser, currentUser, setIsSignedIn, setLogoutMessage } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });

  const onSubmit = async () => {
    try {
      const res = await destroyUser(currentUser.id);
      if (res?.status === 200) {
        setCurrentUser(null);
        setIsSignedIn(false);
        setLogoutMessage({color: "rgb(48, 200, 214)", message: res.message});
      } else {
        setLogoutMessage({ color: "red", message: res.message });
      }
    } catch (e) {
      console.error(e);
      setLogoutMessage({ color: "red", message: e.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full">
        <h2 className='text-lg font-bold mb-8'>アカウント削除</h2>
        <input className="button-color
                        button-color:hover
                      text-white
                        w-full
                        py-3
                        mt-6
                        rounded-sm
                        duration-300"
          type="submit" value="削除"/>
      </form>
    </div>
  );
}
