import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { destroyUser } from '../../apis/users';
// import { ValidationError } from '../parts/ValidationError';

export const AccountDestroyForm = () => {
  const { setLoading, setCurrentUser, currentUser, setIsSignedIn, setFlashMessage } = useContext(AuthContext);
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
        setFlashMessage({color: "rgb(48, 200, 214)", message: "アカウントを削除しました"});
      } else {
        setFlashMessage({ color: "red", message: "アカウントの削除に失敗しました" });
      }
    } catch (e) {
      console.log(e);
      setFlashMessage({ color: "red", message: e.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full px-8 py-10 rounded-sm bg-white">
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
