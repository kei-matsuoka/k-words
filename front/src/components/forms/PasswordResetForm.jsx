import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchPassword } from '../../apis/resetPassword';
import { ValidationError } from '../parts/ValidationError';
import { Navigate } from 'react-router-dom';
import { flash_blue, flash_red } from '../../constants';

export const PasswordResetForm = ({ id, email }) => {
  const [state, setState] = useState(false);
  const { setLoading, setIsSignedIn, setCurrentUser, setLogoutMessage } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, getValues } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      const res = await patchPassword(id, email, data.password);
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        setState(true);
        setLogoutMessage({ color: flash_blue, message: res.message });
      } else {
        setLogoutMessage({ color: flash_red, message: res.message });
      }
    } catch (e) {
      console.error(e);
      setLogoutMessage({ color: flash_red, message: e.message });
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[480px] sb:w-full"
      >
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
            validate: { validate: value => value === getValues("password") || '入力したパスワードと一致していません' }
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

        <input
          className="button-form"
          type="submit"
          value="更新"
          disabled={!isDirty || !isValid}
        />
      </form>
      {state && <Navigate to='/' />}
    </>
  );
}
