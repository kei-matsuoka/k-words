import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchPassword } from '../../apis/resetPassword';
import { ValidationError } from '../parts/ValidationError';

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sp:w-full px-8 py-10 rounded-sm bg-white">
        <h2 className='text-lg font-bold mb-8'>パスワード変更</h2>
        <input hidden autoComplete='username' />
        <input
          className="border p-3 text-sm"
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
          <ValidationError message={errors.password.message} />
        )}
        {errors.password?.types.minLength && (
          <ValidationError message={errors.password.message} />
        )}

        <input
          className="border p-3 text-sm mt-4"
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
          <ValidationError message={errors.password_confirmation.message} />
        )}
        {errors.password_confirmation?.types.minLength && (
          <ValidationError message={errors.password_confirmation.message} />
        )}
        {errors.password_confirmation?.types.validate && (
          <ValidationError message={errors.password_confirmation.types.validate} />
        )}

        <input className="button-color
                          button-color:hover
                        text-white
                          w-full
                          py-3
                          mt-6
                          rounded-sm
                          duration-300
                        disabled:bg-gray-200"
          type="submit" value="更新" disabled={!isDirty || !isValid} />
      </form>
    </div>
  );
}
