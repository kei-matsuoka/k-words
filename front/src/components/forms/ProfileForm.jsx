import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchUser } from '../../apis/users';
import { ValidationError } from '../parts/ValidationError';

export const ProfileForm = () => {
  const { setLoading, setCurrentUser, currentUser, setFlashMessage } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
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
        setCurrentUser(res?.user);
        setFlashMessage({message: "プロフィールを修正しました"});
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full px-8 py-10 rounded-sm bg-white">
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
              value: /[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+/i,
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

        <input className="button-color
                        button-color:hover
                      text-white
                        w-full
                        py-3
                        mt-6
                        rounded-sm
                        duration-300
                      disabled:bg-gray-200"
          type="submit" value="修正" disabled={!isDirty || !isValid} />
      </form>
    </div>
  );
}
