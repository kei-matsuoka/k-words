import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchPassword } from '../../apis/resetPassword';

export const PasswordResetForm = ({id, email}) => {
  const { setLoading, setIsSignedIn ,setCurrentUser, setFlashMessage } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, getValues } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      const res = await patchPassword(id, email, data.password);
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        setFlashMessage({message: "パスワードを更新しました"});
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-80 p-6 rounded-md bg-white">
        <div className='text-center'>
          <h2 className='text-2xl font-bold'>パスワード変更</h2>
        </div>
        <div className='flex flex-col items-center mt-8'>
          <input hidden autoComplete='username' />
          <input
            className="text-center border mt-2"
            type="password"
            placeholder="新しいパスワード"
            autoComplete='new-password'
            {...register("password", {
              required: {
                value: true,
                message: '入力してください'
              },
              minLength: {
                value: 6,
                message: '6文字以上で入力してください'
              }
            })}
          />

          {errors.password?.types.required && (
            <div className='text-red-500'>{errors.password.message}</div>
          )}
          {errors.password?.types.minLength && (
            <div className='text-red-500'>{errors.password.message}</div>
          )}

          <input
            className="text-center border mt-2"
            type="password"
            placeholder="パスワード確認"
            autoComplete='new-password'
            {...register("password_confirmation", {
              required: {
                value: true,
                message: '入力してください'
              },
              minLength: {
                value: 6,
                message: '6文字以上で入力してください'
              },
              validate: { validate: value => value === getValues("password") || '入力したパスワードと一致していません'}
            })}
          />
          {errors.password_confirmation?.types.required && (
            <div className='text-red-500'>{errors.password_confirmation.message}</div>
          )}
          {errors.password_confirmation?.types.minLength && (
            <div className='text-red-500'>{errors.password_confirmation.message}</div>
          )}
          {errors.password_confirmation?.types.validate && (
            <div className='text-red-500'>{errors.password_confirmation?.types.validate}</div>
          )}
        </div>
        <div>
          <input className="button-color
                              button-color:hover
                               text-white
                              py-3 
                              px-12
                              rounded-md
                              duration-300
                              mt-4
                              disabled:bg-gray-200"
            type="submit" value="更新" disabled={!isDirty || !isValid} />
        </div>
      </form>
    </div>
  );
}
