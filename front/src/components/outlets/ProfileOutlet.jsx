import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchUser } from '../../apis/users';
import { ValidationError } from '../parts/ValidationError';
import { useOutletContext } from "react-router-dom";
import { email_reg, flash_blue, flash_red } from '../../constants';

export const ProfileOutlet = () => {
  const { setLoading, setCurrentUser, currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await patchUser(currentUser.id, data);
      if (res?.status === 200) {
        // フラッシュメッセージが出た後にページをレンダリングする
        setTimeout(() => setCurrentUser(res.user), 4000);
        handleFlashMessage(flash_blue, res.message);
      } else {
        handleFlashMessage(flash_red, res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[480px] sb:w-full"
      >
        <h2 className='text-lg font-bold mb-8'>プロフィール編集</h2>
        <input
          className="border p-3 text-sm"
          type="text"
          placeholder="ユーザー名"
          autoComplete="username"
          {...register("name", {
            required: {
              value: true,
              message: '入力してください'
            },
            maxLength: {
              value: 20,
              message: '20文字以内で入力してください'
            },
          })}
        />

        {errors.name?.types.required && (
          <ValidationError message={errors.name.message} />
        )}
        {errors.name?.types.maxLength && (
          <ValidationError message={errors.name.message} />
        )}

        <input
          className="border p-3 text-sm mt-4"
          type="email"
          placeholder="メールアドレス"
          autoComplete='email'
          {...register("email", {
            required: {
              value: true,
              message: '入力してください'
            },
            pattern: {
              value: email_reg,
              message: '有効なメールアドレスを入力してください'
            }
          })}
        />

        {errors.email?.types.required && (
          <ValidationError message={errors.email.message} />
        )}
        {errors.email?.types.pattern && (
          <ValidationError message={errors.email.message} />
        )}

        <input
          className="button-form"
          type="submit"
          value="修正"
          disabled={!isDirty || !isValid}
        />
      </form>
    </>
  );
}
